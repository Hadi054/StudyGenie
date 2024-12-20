const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
const document = dom.window.document;

popup = document.getElementsByClassName("pop_up")
module.exports=popup