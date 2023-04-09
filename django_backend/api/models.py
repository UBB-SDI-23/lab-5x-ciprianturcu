# from django.db import models
#
#
# class Client(models.Model):
#     name = models.CharField(max_length=100)
#     phoneNumber = models.CharField(max_length=10)
#     city = models.CharField(max_length=50)
#     date_of_birth = models.DateField()
#     type = models.CharField(max_length=50,
#                             choices=[('Physical Person', 'Physical Person'), ('Juridical Person', 'Juridical Person')])
#
#     def __str__(self):
#         return self.name
#
#
# class Lawsuit(models.Model):
#     types = ['Criminal', 'Civil', 'Family', 'Commercial', 'Juvenile', 'Tax']
#     Choice = sorted([(item, item) for item in types])
#
#     description = models.CharField(max_length=100)
#     type = models.CharField(max_length=50,
#                             choices=Choice)
#     state = models.CharField(max_length=50)
#     courtDate = models.DateField()
#     client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='lawsuits')
#
#     def __str__(self):
#         return self.description
#
#
# class Attorney(models.Model):
#     types = ['Criminal', 'Civil', 'Family', 'Commercial', 'Juvenile', 'Tax']
#     Choice = sorted([(item, item) for item in types])
#     name = models.CharField(max_length=100)
#     specialization = models.CharField(max_length=50,
#                                       choices=Choice)
#     date_of_birth = models.DateField()
#     experience = models.CharField(max_length=50, choices=[('Junior', 'Junior'), ('Mid', 'Mid'), ('Senior', 'Senior')])
#     city = models.CharField(max_length=100)
#     fee = models.IntegerField()
#
#     def __str__(self):
#         return self.name
#
#
# class AttorneyOnLawsuit(models.Model):
#     attorney = models.ForeignKey(Attorney, on_delete=models.CASCADE)
#     lawsuit = models.ForeignKey(Lawsuit, on_delete=models.CASCADE)
#     attRole = models.CharField(max_length=50, choices=[('Primary', 'Primary'), ('Secondary', 'Secondary')])
#     workType = models.CharField(max_length=50,
#                                 choices=[('Documents', 'Documents'), ('Statement preparation', 'Statement preparation'),
#                                          ('Evidence collection', 'Evidence collection')])
