from rest_framework import status, generics
from rest_framework.views import APIView


from rest_framework.response import Response

from api.models.Client import Client
from api.serializers.ClientSerializers import ClientSerializer
from api.serializers.LawsuitSerializers import LawsuitSerializer


class LawsuitsOfClientList(APIView):
    def post(self, request, id):
        lawsuits = request.data
        clients = request.data
        msg = "CREATED"

        for lawsuit_data in lawsuits:
            lawsuit_data['client'] = id
            serializer = LawsuitSerializer(data=lawsuit_data)
            if serializer.is_valid():
                serializer.save()
        return Response(msg, status=status.HTTP_201_CREATED)



class ClientList(generics.ListCreateAPIView):
    serializer_class = ClientSerializer
    queryset = Client.objects.all()

    # def list(self, request, *args, **kwargs):
    #     queryset = self.get_queryset()
    #     id_list = list(queryset.values_list('id', flat=True))
    #     return Response(id_list)


class ClientDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ClientSerializer
    queryset = Client.objects.all()