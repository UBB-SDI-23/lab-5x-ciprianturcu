import re

from rest_framework import serializers

from api.models import Attorney


class AttorneySerializer(serializers.ModelSerializer):
    def validate(self, data):
        pattern = r'^[a-zA-Z\s]+$'
        if not bool(re.match(pattern, data['name'])):
            raise serializers.ValidationError('Name must contain only letters and spaces')
        return data

    class Meta:
        model = Attorney
        fields = '__all__'