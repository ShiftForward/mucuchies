Dashboard = Ember.Application.create({
  rootElement: '#dashboardapp',
  LOG_TRANSITIONS: true
});

require('app/helpers/smooth_helper');

require('app/models/widgets/widget');
require('app/models/widgets/flippable_widget');
require('app/models/widgets/text_widget');
require('app/models/widgets/list_widget');
require('app/models/widgets/image_widget');
require('app/models/widgets/clock_widget');
require('app/models/widgets/meter_widget');
require('app/models/widgets/graph_widget');
require('app/models/widgets/html_widget');
require('app/models/widgets/weather_widget');
require('app/models/widgets/song_widget');
require('app/models/widgets/build_widget');
require('app/models/widgets/number_widget');
require('app/models/widgets/scrum_widget');
require('app/models/widgets/embed_widget');
require('app/models/widgets/youtube_widget');
require('app/models/widgets/rss_widget');
require('app/models/widgets/tweet_widget');
require('app/models/widgets/composite_widget');

require('app/models/sources/source');
require('app/models/sources/periodic_source');
require('app/models/sources/last_fm_source');
require('app/models/sources/atmosphere_source');
require('app/models/sources/trello_source');
require('app/models/sources/weather_source');
require('app/models/sources/bitstamp_source');
require('app/models/sources/jenkins_source');
require('app/models/sources/time_source');
require('app/models/sources/rss_source');
require('app/models/sources/twitter_timeline_source');

require('app/views/gridster_view');
require('app/views/last_updated_view');

require('app/models/widget_factory');

require('app/controllers/dashboard_controller');

require('app/routes/router');
