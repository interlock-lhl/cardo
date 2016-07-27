// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

$(function() {
  var board = null;
  var columns = null;
  $.getJSON('/api/boards/1', function(data, err) {
    if (err !== "success") {
      alert('Failed to load board');
    } else {
      board = data;
      columns = data.columns;
      updateBoard(board);
    }
  });


  var columnTemplate = Handlebars.compile($('#hb-column').html());
  var cardTemplate = Handlebars.compile($('#hb-card').html());

  function updateBoard(board) {
    $('h2').text(board.name);
    board.columns.forEach(function(item) {
      renderColumn(item);
    });
  }

  // Add a column, name required but order is derived if not provided
  function addColumn(name, order) {
    order = order || columns.length;
    var column = {id: order, name: name, order: order, cards: []};
    columns.push(column);
    renderColumn(column);
    return column;
  }

  // Render a column onto the board.
  function renderColumn(column) {
    var elm = $(columnTemplate(column));

    elm.find('ul').sortable();
    //   {
    //     items: "li.card",
    //   }
    // );

    elm.on('click', 'button.add', function() {
      var title = prompt("Card Title?"); //TODO refactor to jquery ui dialog
      addCard(column, title, "");
    });

    // Edit a Card
    elm.on('click', 'button.edit', function(event) {
      var cardElm = $(this).parent();
      console.log(column);
      console.log(parseInt(cardElm.attr('data-card-id')));
      var card = findCardById(column, parseInt(cardElm.attr('data-card-id')));
      var new_title = prompt("New Title?", card.title);
      card.title = new_title;
      $.ajax({
        method: 'PUT',
        url: '/api/boards/' + column.board_id + '/columns/' + column.id + '/cards/' + card.id,
        data: JSON.stringify(card),
        contentType: 'application/json',
        success: function(data, success) {
          if (success == 'success') {
            column.cards.splice(column.cards.indexOf(card),1); // remove the old card
            column.cards.push(data);
            var new_elm = $(cardTemplate(data));
            cardElm.replaceWith(new_elm);            
          }
        }
      });
    });

    // When deleting a card
    elm.on('click', 'button.delete', function() {
      console.log('delete');
    });

    elm.insertBefore('.board div.add-column');

    // TODO refactor
    column.cards.forEach(function(item) {
      renderCard(item);
    });
  }

  // Add a card to the column of a board
  function addCard(column, title, description, position) {
    // position = position || column.cards.length;
    var card = {title: title, description: description };
    $.ajax({
      method: "POST",
      url: "/api/boards/" +board.id +"/columns/" + column.id + "/cards",
      data: JSON.stringify(card),
      contentType: 'application/json',
      success: function(data, success) {
        column.cards = column.cards || [];
        column.cards.push(data);
        renderCard(data);
      }
    });
    // column.cards.push(card);
    // renderCard(card);
    return card;
  }

  // Render a card in a column
  function renderCard(card) {
    var elm = $(cardTemplate(card));

    $("[data-column-id=" + card.column_id + "]").find('ul').append(elm);
  }

  // given a column, find a column by it's id
  function findCardById(column, id) {
    var c = null
    column.cards.forEach(function(card) {
      if (card.id == id) c = card;
    });

    return c;
  }

  // Setup add column
  $('div.board div.add-column').on('click', 'button', function() {
    var name = prompt("Column Name?")
    $.ajax({
      method: 'POST',
      url: '/api/boards/' + board.id + '/columns',
      data: JSON.stringify({ name: name }),
      contentType: "application/json",
      success: function(data, success) {
        //TODO deal with success no == success
        columns.push(data);
        renderColumn(data);
        // addColumn(data);
      }
      // dataType: 'json'
    });
    //addColumn(name); //TODO refactor to jquery ui dialog
  });
});
