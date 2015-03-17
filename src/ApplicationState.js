'use strict';

import State from './lib/State';
import  initialState from './initialState';

let applicationState = initialState;

//if (process.env.IS_BROWSER){
//    applicationState = window.__DATA__;
//    delete window.__app_state__;
//}

export const state = new State(applicationState);
export const title = state.cursor('title');
export const articles = state.cursor('articles');
export const tags = state.cursor('tags');
