{elseif isset($cms_category) && $cms_category->id == 4}
	<div class="rte mb-30">
		<h2>Słownik pojęć</h2>
		Będziesz mógł:
		<ul>
			<li>dowiedzieć się więcej o jakości podzespołów naszych mebli,</li>
			<li>świadomie wybrać produkt,</li>
			<li>ocenić czy te informacje były dla Ciebie przydatne</li>
		</ul>
	</div>
	<div class="slownik row">

		<div class="json hidden">{$cms_pages|@json_encode}</div>
		
		<div class="col-xs-12 col-md-3 slownik-list">
			<ul class="cms-page-other">
				{foreach from=$cms_pages key=cmsitems item=cmspages}
					<li id="{$cmspages.id_cms}">
						<div class="cms-other-title p-10">{$cmspages.meta_title}</div>
					</li>
				{/foreach}
			</ul>
		</div>

		<div class="col-md-9 col-xs-12">
			<div class="results owl-carousel">
			{foreach from=$cms_pages key=cmsitems item=cmspages name=pages}
				<div id="main-content" data-id="{$cmspages.id_cms}" class="cms-page-main box"><h3 class="cms-page-main__title text-center">{$cmspages.meta_title}</h3><div class="cms-page-main__content text-justify">{$cmspages.content}</div></div>
			{/foreach}
			</div>
		</div>

</div>