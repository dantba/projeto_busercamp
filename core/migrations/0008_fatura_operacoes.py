# Generated by Django 3.1.5 on 2021-01-29 14:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_fatura_fechada'),
    ]

    operations = [
        migrations.AddField(
            model_name='fatura',
            name='operacoes',
            field=models.ManyToManyField(to='core.Operacao'),
        ),
    ]