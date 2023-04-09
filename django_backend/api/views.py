from django.db.models import Sum, F
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Attorney, Lawsuit, Client, AttorneyOnLawsuit
from .serializers import AttorneySerializer, LawsuitSerializer, ClientSerializer, AttorneyOnLawsuitSerializer, \
    LawsuitProfitReportDTO, AttorneyTravelDTO


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


class LawsuitList(generics.ListCreateAPIView):
    serializer_class = LawsuitSerializer

    def get_queryset(self):
        queryset = Lawsuit.objects.all()
        client = self.request.query_params.get('client')
        if client is not None:
            queryset = queryset.filter(client=client)
        return queryset

    # def list(self, request, *args, **kwargs):
    #     queryset = self.get_queryset()
    #     id_list = list(queryset.values_list('id', flat=True))
    #     return Response(id_list)


class LawsuitDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = LawsuitSerializer
    queryset = Lawsuit.objects.all()


class AttorneyOnLawsuitList(generics.ListCreateAPIView):
    serializer_class = AttorneyOnLawsuitSerializer
    queryset = AttorneyOnLawsuit.objects.all()

    # def list(self, request, *args, **kwargs):
    #     queryset = self.get_queryset()
    #     id_list = list(queryset.values_list('id', flat=True))
    #     return Response(id_list)


class AttorneyOnLawsuitDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = AttorneyOnLawsuitSerializer
    queryset = AttorneyOnLawsuit.objects.all()


class ProfitStatisticView(generics.ListAPIView):
    serializer_class = LawsuitProfitReportDTO

    def get_queryset(self):
        #queryset = Lawsuit.objects.annotate(profit=Sum('attorneyonlawsuit__attorney__fee')).order_by('-profit')[:3]
        queryset = Lawsuit.objects.annotate(profit=Sum('attorneyonlawsuit__attorney__fee')).order_by(F('-profit').desc(nulls_last=True))
        return queryset


class AttorneyTravelView(generics.ListAPIView):
    serializer_class = AttorneyTravelDTO

    def get_queryset(self):
        queryset = AttorneyOnLawsuit.objects.exclude(attorney__city=F('lawsuit__state')) \
            .annotate(name=F('attorney__name')).annotate(city=F('attorney__city')) \
            .annotate(lawsuit_state=F('lawsuit__state'))
        return queryset
