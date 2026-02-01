---
layout: single
title: "Tags"
permalink: /blog/tags/
author_profile: true
---

<div class="blog-wrapper">

<div class="blog-tags-cloud">
{% assign sorted_tags = site.tags | sort %}
{% for tag in sorted_tags %}
  {% assign count_en = tag[1] | where_exp: "item", "item.lang != 'fr'" | size %}
  {% if count_en > 0 %}
  <a href="#{{ tag[0] | slugify }}" class="blog-post__tag">{{ tag[0] }} ({{ count_en }})</a>
  {% endif %}
{% endfor %}
</div>

<hr style="margin: 2rem 0;">

{% for tag in sorted_tags %}
  {% assign posts_en = tag[1] | where_exp: "item", "item.lang != 'fr'" %}
  {% if posts_en.size > 0 %}
  <h3 id="{{ tag[0] | slugify }}">{{ tag[0] }} <small>({{ posts_en.size }})</small></h3>
  <ul class="blog-archives">
    {% for post in posts_en %}
      <li>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        <small>({{ post.date | date: "%b %d, %Y" }})</small>
      </li>
    {% endfor %}
  </ul>
  {% endif %}
{% endfor %}

</div>
