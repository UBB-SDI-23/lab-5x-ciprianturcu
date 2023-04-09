from rest_framework import serializers

from api.models import AttorneyOnLawsuit


class AttorneyOnLawsuitSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttorneyOnLawsuit
        fields = '__all__'