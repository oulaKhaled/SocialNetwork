from django.db import models
import core.settings
from django.conf import settings
from datetime import date

# Create your models here.


class Group(models.Model):
    user1 = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=False,
        blank=False,
        related_name="user1",
    )
    user2 = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=False,
        blank=False,
        related_name="user2",
    )
    date = models.DateTimeField(null=False, default=date.today, blank=False)

    class Meta:
        unique_together = (("user1", "user2"),)

    def __str__(self):
        return self.id


class Message(models.Model):
    sender = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=False,
        blank=False,
        related_name="sender",
    )
    receiver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=False,
        blank=False,
        related_name="receiver",
    )
    content = models.CharField(max_length=500, null=False, blank=False)
    date = models.DateTimeField(null=False, blank=False, default=date.today)
    group = models.ForeignKey(Group, null=False, blank=False, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.sender} sent {self.content} to {self.receiver}"
