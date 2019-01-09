var $grid = $('.filter-grid').isotope({
  itemSelector: '.grid-deel',
  layoutMode: 'fitRows'
});

/* FILTERING */
$(".filter-knoppen button").click(function(){
  var value = $(this).attr('data-name');
  console.log(value);
  $grid.isotope({
  filter: value
  });
});
