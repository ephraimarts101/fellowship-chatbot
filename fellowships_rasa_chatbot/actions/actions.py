from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher


fellowship_list = [
    {
        "name": "Reformers City",
        "venue": "Uni Audit, Backgate",
        "close_to": ["back gate"]
    },
    {
        "name": "NFC",
        "venue": "Block C1",
        "close_to": ["back gate"]
    },
    {
        "name": "Dominion City",
        "venue": "Block C1",
        "close_to": ["back gate"]
    },
    {
        "name": "CASOR",
        "venue": "Humanities Hall 1",
        "close_to": ["back gate", "front gate", "junction", "nwakpu"]
    },
    {
        "name": "MCF",
        "venue": "Humanities Hall 101",
        "close_to": ["front gate", "nwakpu", "junction"]
    },
    {
        "name": "watchman",
        "venue": "Humanities Hall 205",
        "close_to": ["front gate", "junction", "nwakpu"]
    },
    {
        "name": "Chosen Charismatic Church",
        "venue": "Education Hall 1",
        "close_to": ["front gate", "nwakpu", "junction"]
    },
    {
        "name": "PSF",
        "venue": "Science Lecture Hall 4",
        "close_to": ["perm site", "junction"]
    },
    {
        "name": "RCF",
        "venue": "Physical Science Auditorium, perm site",
        "close_to": ["perm site", "junction"]
    },
    {
        "name": "CORE",
        "venue": "Biological Science Auditorium, perm site",
        "close_to": ["perm site", "junction"]
    },
    {
        "name": "KD",
        "venue": "NEEDS Assessment Building, Perm site",
        "close_to": ["perm site", "junction"]
    },
    {
        "name": "Bethel city",
        "venue": "Ezzamgbo",
        "close_to": ["ezzamgbo", "front gate"]
    },
    {
        "name": "Vintage Church",
        "venue": "Ezzamgbo",
        "close_to": ["ezzamgbo", "front gate"]
    },
]

class ActionRecommendFellowships(Action):
    def name(self) -> Text:
        return "action_recommend_fellowships"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        location = tracker.get_slot('location')
        user_name = tracker.get_slot('user_name')

        if location:
            location = location.lower().strip()
        else:
            dispatcher.utter_message(text="I didn't get your location. Could you please tell me where you stay?")
            return []

        nearby_fellowships = [
            f for f in fellowship_list if location in [l.lower() for l in f.get("close_to", [])]
        ]

        if nearby_fellowships:
            message = f"Hello {user_name}, here are the fellowships near {location}:\n\n"
            for f in nearby_fellowships:
                message += f"- {f['name']} at {f['venue']}.\n"
        else:
            fallback = fellowship_list[0]
            message = (
                f"Sorry {user_name}, I couldn't find any fellowships near {location}.\n"
                f"How about checking out {fallback['name']} at {fallback['venue']}?"
            )

        dispatcher.utter_message(text=message)
        return []