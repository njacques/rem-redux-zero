# README

2017.09.17

> With the release of Rails 5.1, Rails now has native support for using React via the webpacker gem. 

This app integrates the [Create React App](https://github.com/facebookincubator/create-react-app) starter example with a simple API-based Rails project, using the [webpacker gem](https://github.com/rails/webpacker).

## The Basic Project

More or less followed this: https://www.pluralsight.com/guides/ruby-ruby-on-rails/building-a-crud-interface-with-react-and-ruby-on-rails

It implements an API with the following endpoint: `index`, `create`, `destroy`, `update`.

And it has one view: `site#index`, set as the root view: `root to: 'site#index'`


## Installing webpacker

- Add following to `Gemfile`: `gem 'webpacker'`
- `bundle install`
- Make sure Yarn is installed globally (will need to do this for production, too)
- `rails webpacker:install`
- `rails webpacker:install:react`
- Add `<%= javascript_pack_tag 'application' %>` to `application.html.erb`

Now you can start the server and visit localhost:3000 to see the canonical React example.


## Taking it further

- Run Create React App outside of Rails dir
- Copy the contents of the `src` folder to `app/javascript/components`
- In `views/site/index.html.erb` add: `<div id="root"></div>`
- Edit `app/javascript/packs/application.js` thus:

  ```js
  import React from 'react';
  import ReactDOM from 'react-dom';
  import '../components/index.css';
  import App from '../components/App';
  import registerServiceWorker from '../components/registerServiceWorker';

  document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<App />, document.getElementById('root'));
  });

  registerServiceWorker();
  ```

- Add `<%= stylesheet_pack_tag 'application' %>` to `application.html.erb` so that webpacker picks up on the styles in the components folder.
- Run `./bin/webpack-dev-server` to start the webpack dev server

And you're in business.

## Note

If the `node_modules` folder is deleteed between times, you need to run `rails webpacker:install` to recreate it.

## Links

- https://www.pluralsight.com/guides/ruby-ruby-on-rails/building-a-crud-interface-with-react-and-ruby-on-rails
- https://gorails.com/episodes/using-webpack-in-rails-with-webpacker-gem
- https://medium.com/react-on-rails/free-tutorial-how-to-use-react-with-webpacker-and-rails-5-1-92af8e8d9d63
- https://github.com/rails/webpacker/issues/317
- https://x-team.com/blog/get-in-full-stack-shape-with-rails-5-1-webpacker-and-reactjs/



