from django.db import models

from api.models.Attorney import Attorney
from api.models.Lawsuit import Lawsuit


class AttorneyOnLawsuit(models.Model):
    attorney = models.ForeignKey(Attorney, on_delete=models.CASCADE)
    lawsuit = models.ForeignKey(Lawsuit, on_delete=models.CASCADE)
    attRole = models.CharField(max_length=50, choices=[('Primary', 'Primary'), ('Secondary', 'Secondary')])
    workType = models.CharField(max_length=50,
                                choices=[('Documents', 'Documents'), ('Statement preparation', 'Statement preparation'),
                                         ('Evidence collection', 'Evidence collection')])
