function chargerproduit(){
	$.ajax({
		url: "/produits",
		success: function(result) {
			console.log(result)
			$.each(result, function (key, value){
				item = item_to_html(value);
				$('#list_items').append(item);
			});
		}
	})


}

function add_item(id_item){
	$.ajax({
		url: "/clients/1/panier",
		method:"POST",
		data: {"idProduit": id_item, "quantite": 1},
		beforeSend: function (xhr){
			xhr.setRequestHeader('Authorization', "Basic "+ "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k"	);
		},
		success: function(result) {
			nbItem = 0
			for(let i = 0; i < result.items.length; i++){
				nbItem+=result.items[i].quantite;
			}
			$('#item_counter').text(nbItem);
		}
	});
}

function chargerpanier(){
	$.ajax({
		url: "/clients/1/panier",
		method:"GET",
		data: {},
		beforeSend: function (xhr){
			xhr.setRequestHeader('Authorization', "Basic "+ "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZENsaWVudCI6MSwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYzNjc1MjI1MywiZXhwIjoxODM2NzUyMjUzfQ.qMcKC0NeuVseNSeGtyaxUvadutNAfzxlhL5LYPsRB8k"	);
		},
		success: function(result) {
			panier = $('#table_panier');
			$.each(result.items, function (key, value){
				console.log(value)
				item = panier_to_html(value);
				panier.append(item);
			});
			$('#le_prix_total').text("Prix total : " + result.valeur.toFixed(2));
		}
	});
}

function item_to_html(item){
	item_card = $('<div></div>')
		.addClass('card mb-4 rounded-3 shadow-sm');
	item_head = $('<div></div>')
		.addClass('card-header py-3')
		.append('<h4 class="my-0 fw-normal">' + item.nom + '</h4>');
	item_detail = $('<ul></ul>')
		.addClass('list-unstyled mt-3 mb-4')
		.append('<li>Qte :' + item.qte_inventaire +'</li>')
		.append('<li>Categorie :' + item.categorie.nom +'</li>')
		.append('<li>Description :' + item.description +'</li>');
	item_body = $('<div></div>')
		.addClass('card-body')
		.append(' <h1 class="card-title text-center"> $' + item.prix +'</h1>');
	item_logo = $('<p></p>')
		.addClass('w-100 display-6 text-center')
	item_button = $('<button onclick="add_item('+item.id+')"></button>')
		.addClass('btn btn-primary position-relative')
		.append('<i class="bi bi-cart-plus"></i>')
	item_logo.append(item_button)
	item_body.append(item_detail).append(item_logo);
	item_card.append(item_head).append(item_body);
	return $('<div></div>').addClass('col-md-3') .append(item_card);
}

function panier_to_html(item){
	item_produit = $('<tr></tr>')

	.append('<th>'+item.nomProduit+'</th>')
	.append('<th>'+item.quantite+'</th>')
	.append('<th>'+item.prix+'</th>')
	.append('<th>'+(item.quantite*item.prix).toFixed(2)+'</th>');
	return item_produit;
}


$(function () {
	console.log("ift215");
});
