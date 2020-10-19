
$(document).ready(function(){
	fill_parent_items();
	fill_treeview();

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

	function fill_parent_items()
	{
		$.ajax({
		url:'sub_items.php',
		success:function(data){
			$('#parent_item').html(data);
			}
		});
	}

});

