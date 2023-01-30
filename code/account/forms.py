from django import forms
from django.contrib.auth import(authenticate)

from .models import Profile


class LoginForm(forms.Form):
    username = forms.CharField(max_length=100,widget=forms.TextInput(
                attrs={
                    'class':'form-control'
                }
        ))
    password = forms.CharField(widget=forms.PasswordInput(attrs={'class':'form-control'})
        )

    def clean_username(self,*args,**kwargs):
        user = Profile.objects.filter(username=self.cleaned_data.get('username'))
        if not user:
            raise forms.ValidationError("User does not exist")

        return user[0].username
    
    def clean_password(self,*args,**kwargs):
        username = self.cleaned_data.get('username')
        password = self.cleaned_data.get('password')
        if username and password:
            user = authenticate(username=username,password=password)
            if not user:
                raise forms.ValidationError('Password INVALID')
        return password



