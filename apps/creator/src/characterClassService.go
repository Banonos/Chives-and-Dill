package main

import "encoding/json"

type CharacterClass struct {
	Id          string `json:"id" bson:"-"`
	Name        string `json:"name"`
	IconImage       string `json:"iconImage"`
}

type CharacterClassesService struct {
	application   *Application
	CharacterClasses map[string]CharacterClass

	actionStream chan TypedAction
}

func (s *CharacterClassesService) processAction(action TypedAction) {
	s.actionStream <- action
}

func (s *CharacterClassesService) init() {
	api := CharacterClassesDbApi{application: s.application}

	s.CharacterClasses = api.getCharacterClasses()
}

func (service *CharacterClassesService) handleNewConnection() {
	// // TO idzie do kazdego usera :o
	service.application.writter.stream <- prepareUpdatePayload("characterClasses", service.CharacterClasses)
}

func (service *CharacterClassesService) serve() {
	for {
		action := <-service.actionStream

		if action.ActionType == createCharacterClass {
			var createCharacterClassAction CreateCharacterClassAction
			json.Unmarshal(action.Body, &createCharacterClassAction)

			characterClass := createCharacterClassAction.CharacterClass

			api := CharacterClassesDbApi{application: service.application}
			characterClass.Id = api.saveCharacterClass(characterClass)

			service.CharacterClasses[characterClass.Id] = characterClass
			service.application.writter.stream <- prepareUpdatePayload("characterClasses", map[string]CharacterClass{characterClass.Id: characterClass})
		}

		if action.ActionType == deleteCharacterClass {
			var deleteCharacterClassAction DeleteCharacterClassAction
			json.Unmarshal(action.Body, &deleteCharacterClassAction)

			api := CharacterClassesDbApi{application: service.application}
			api.deleteCharacterClass(deleteCharacterClassAction.CharacterClassId)

			delete(service.CharacterClasses, deleteCharacterClassAction.CharacterClassId)
			service.application.writter.stream <- prepareDeletePayload("characterClasses", []string{deleteCharacterClassAction.CharacterClassId})

		}

		if action.ActionType == updateCharacterClass {
			var updateCharacterClassAction UpdateCharacterClassAction
			json.Unmarshal(action.Body, &updateCharacterClassAction)

			characterClass := updateCharacterClassAction.CharacterClass

			api := CharacterClassesDbApi{application: service.application}
			api.updateCharacterClass(characterClass)

			service.CharacterClasses[characterClass.Id] = characterClass
			service.application.writter.stream <- prepareUpdatePayload("characterClasses", map[string]CharacterClass{characterClass.Id: characterClass})
		}
	}
}
