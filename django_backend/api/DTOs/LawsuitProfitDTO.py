from rest_framework import serializers


class LawsuitProfitReportDTO(serializers.Serializer):
    description = serializers.CharField()
    profit = serializers.IntegerField(default=0)

class AttorneyTravelDTO(serializers.Serializer):
    name = serializers.CharField()
    city = serializers.CharField()
    lawsuit_state = serializers.CharField()