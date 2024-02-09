from channels.generic.websocket import AsyncWebsocketConsumer, WebsocketConsumer
import json
from asgiref.sync import async_to_sync, sync_to_async
from .models import Group, Message
from Profile.models import User


def create_Group(user1, user2):
    user1_obj = User.objects.get(id=user1)
    user2_obj = User.objects.get(id=user2)
    newGroup = Group.objects.create(user1=user1_obj, user2=user2_obj)
    newGroup.save()
    return newGroup


class ChatConsumer(AsyncWebsocketConsumer):
    # This method is called when a client connects to the WebSocket server.

    async def connect(self):
        user1 = self.scope["url_route"]["kwargs"]["user1"]
        user2 = self.scope["url_route"]["kwargs"]["user2"]
        if int(user1) > int(user2):
            self.room_name = f"{user1}_{user2}"
        else:
            self.room_name = f"{user2}_{user1}"

        sync_to_async(create_Group(user1, user2))
        self.room_group_name = "chat_%s" % self.room_name
        # self.user = self.scope["user"]
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        print(" group name :", self.room_group_name)
        # print(" user:", self.user)
        print("channel name", self.channel_name)

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        # user = text_data_json["user"]
        print(" Recive  Message : ", message)

        await self.channel_layer.group_send(
            self.room_group_name, {"type": "chat_message", "message": message}
        )
        # await self.send(text_data=json.dumps({"type": "chat", "message": message}))

    async def chat_message(self, event):
        message = event["message"]
        await self.send(text_data=json.dumps({"type": "chat", "message": message}))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)
