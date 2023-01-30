
from django.contrib import admin
from django.urls import path,include
from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView

from account.views import LoginView, LogoutView, MobileLoginView, MobileLogoutView



urlpatterns = [
    path('admin/', admin.site.urls),
    path('dashboard/', TemplateView.as_view(template_name='frame.html')),

    # html rendering for mobile devices
    path('mobile/', TemplateView.as_view(template_name='mobile_frame.html')),

    path('login/', LoginView, name="login"),
    path('mobile/login/', MobileLoginView, name="mobile-login"),
    path('logout/', LogoutView, name="logout"),
    path('mobile/logout/', MobileLogoutView, name="mobile-logout"),

    path('api/engine/', include('engine.engineApi.urls', namespace="engine-api")),
    path('api/idyahub/', include('idyahub.hubApi.urls', namespace="idyahub-api")),
    path('api/account/', include('account.accountApi.urls', namespace="account-api")),
    path('api/qna/', include('qna.qnaApi.urls', namespace="qna-api")),
    path('api/channel/', include('channel.channelApi.urls', namespace="channel-api")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
