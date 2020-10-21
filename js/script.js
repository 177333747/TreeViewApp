/**
 * @param  {} document
 * @param  {} .ready(function(
 */
$(document).ready(function(){

	fill_parent_items();
	fill_treeview();
	
	/**
	 * @param  {"list.php"} {$.ajax({url
	 * @param  {"json"} dataType
	 * @param  {function(data} success
	 */
	function fill_treeview()
	{
		$.ajax({
		url:"list.php",
		dataType:"json",
		success:function(data){
				$('#treeview').treeview({
					data:data,
					multiSelect: $('#chk-select-multi').is(':checked'),
		            onNodeSelected: function(event, node) {
		              $('#rmv-btn').attr('data-itm-id', node.id);
		              $('#rmv-btn').attr('data-itm-pid', node.pid);
		            },
		            onNodeUnselected: function(event, node) {

		            }
				});
			}
		})
	}
	
	/**
	 * @param  {'sub_items.php'} {$.ajax({url
	 * @param  {function(data} success
	 */
	function fill_parent_items()
	{
		$.ajax({
		url:'sub_items.php',
		success:function(data){
			$('#parent_item').html(data);
			}
		});
	}
	/**
	 * @param  {} '#treeview_form'
	 * @param  {} .on('submit'
	 * @param  {} function(event
	 * @param  {} {event.preventDefault(
	 * @param  {"add.php"} ;$.ajax({url
	 * @param  {"POST"} method
	 * @param  {$(this} data
	 */
	$('#treeview_form').on('submit', function(event){
		event.preventDefault();
		$.ajax({
		url:"add.php",
		method:"POST",
		data:$(this).serialize(),
		success:function(data){
			fill_treeview();
			fill_parent_items();
				$('#treeview_form')[0].reset();
				alert('New Item added successfully..!');
			}
		})
	});
	/**
	 * @param  {} '#rmv-btn'
	 * @param  {} .on('click'
	 * @param  {} function(e
	 * @param  {} {varid=$(this
	 * @param  {} .attr('data-itm-id'
	 * @param  {} ;varpid=$(this
	 * @param  {} .attr('data-itm-pid'
	 * @param  {} ;if(confirm('areyousureyouwanttodeletethisitem?'
	 * @param  {'delete.php'} {$.ajax({url
	 * @param  {'POST'} method
	 * @param  {'id='+id+'&pid='+pid} data
	 * @param  {function(data} success
	 */
	$('#rmv-btn').on('click', function(e) {
		var id = $(this).attr('data-itm-id');
		var pid = $(this).attr('data-itm-pid');
		if (confirm('are you sure you want to delete this item?')) {
			$.ajax({
				url:'delete.php',
				method:'POST',
				data:'id='+id+'&pid='+pid,
				success: function(data) {
					fill_treeview();
					fill_parent_items();
					$('#treeview_form')[0].reset();			
					alert('Item deleted successfully..!');
				}
			})
		}
	});
});

