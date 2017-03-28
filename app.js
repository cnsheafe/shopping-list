/*jshint  esversion: 6*/

function initState() {
  let state = {
    list: []//array of text items
  };

  $('.shopping-list').find('.shopping-item').each(function() {
    addItem(state, $(this).text());
  });
  return state;
}

function addItem(state, item) {
  state.list.push(item);
}

function removeItem(state, index) {
  state.list.splice(state.list.length -1 - index,1);
}

function renderAddItem(state, element) {
  let htmlStr =
  '<li>'+
  '<span class="shopping-item">'+state.list[state.list.length-1]+'</span>'+
  '<div class="shopping-item-controls">'+
  '<button class="shopping-item-toggle">'+
  '<span class="button-label">check</span></button>'+
  '<button class="shopping-item-delete">'+
  '<span class="button-label">delete</span></button>'+'</div>'+
  '</li>';
  $(element).prepend(htmlStr);
}

function renderRemoveItem(index, element) {
  $(element).eq(index).remove();
}

$(function main() {

  let state = initState();

  $('form').on('submit', function(ev) {
    ev.preventDefault();
    const textInput = $(this).serializeArray()[0].value;
    addItem(state, textInput);
    renderAddItem(state, '.shopping-list');
  });

  $('.shopping-list').on('click', '.shopping-item-delete', function() {
    let index = $(this).parent().index('.shopping-item-controls');
    removeItem(state, index);
    renderRemoveItem(index, 'li');
  });
});
