from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    url(r'^layout_navbar\.js$', 'frame.views.navbar'),
    url(r'^user$', 'frame.view.user.list'),
    url(r'^user/edit$', 'frame.view.user.edit'),
    url(r'^user/add$', 'frame.view.user.add'),
)

