from django.contrib import admin
from .models import Attorney, Lawsuit, Client, AttorneyOnLawsuit

admin.site.register(Attorney)
admin.site.register(Lawsuit)
admin.site.register(Client)
admin.site.register(AttorneyOnLawsuit)
