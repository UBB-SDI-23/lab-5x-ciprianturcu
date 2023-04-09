import re

from rest_framework import serializers

from api.models import Lawsuit


class LawsuitSerializer(serializers.ModelSerializer):

    def validate(self, data):
        pattern = r'^[a-zA-Z\s-]+$'
        if not bool(re.match(pattern, data['state'])):
            raise serializers.ValidationError('City must contain only letters, spaces and hyphens')
        return data

    class Meta:
        model = Lawsuit
        fields = ('id','description', 'type', 'state', 'courtDate','client')

