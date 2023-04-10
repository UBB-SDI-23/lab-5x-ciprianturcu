from rest_framework import generics

from api.models.Attorney import Attorney
from api.serializers.AttorneySerializers import AttorneySerializer


class AttorneyList(generics.ListCreateAPIView):
    queryset = Attorney.objects.all()
    serializer_class = AttorneySerializer

    def get_queryset(self):
        queryset = Attorney.objects.all()
        fee = self.request.query_params.get('fee__gt')
        if fee is not None:
            queryset = queryset.filter(fee__gt=fee)
        return queryset

    # def list(self, request, *args, **kwargs):
    #     queryset = self.get_queryset()
    #     id_list = list(queryset.values_list('id', flat=True))
    #     return Response(id_list)


class AttorneyDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AttorneySerializer
    queryset = Attorney.objects.all()