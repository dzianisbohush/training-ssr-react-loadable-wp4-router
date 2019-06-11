import React from 'react';
import Loadable from 'react-loadable';
import { Switch, Route } from 'react-router-dom';

const TitleAsync = Loadable({
  loader: () => import(/* webpackChunkName: "title" */'./title'),
  loading() {
    return <div>Loading...</div>
  }
});

const LoremIpsumAsync = Loadable({
  loader: () => import(/* webpackChunkName: "lorem-ipsum" */'./loremIpsum'),
  loading() {
    return <div>Loading...</div>
  }
});

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={TitleAsync} />
      <Route path="/r" component={LoremIpsumAsync} />
    </Switch>
  )
}
