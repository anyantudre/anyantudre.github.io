---
layout: single
title: "Categories"
permalink: /blog/categories/
author_profile: true
---

<div class="blog-wrapper">

{% for category in site.categories %}
  {% assign posts_in_cat = category[1] | where_exp: "item", "item.lang != 'fr'" %}
  {% if posts_in_cat.size > 0 %}
  <h3 id="{{ category[0] | slugify }}">{{ category[0] }} <small>({{ posts_in_cat.size }})</small></h3>
  <ul class="blog-archives">
    {% for post in posts_in_cat %}
      <li>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        <small>({{ post.date | date: "%b %d, %Y" }})</small>
      </li>
    {% endfor %}
  </ul>
  {% endif %}
{% endfor %}

</div>
