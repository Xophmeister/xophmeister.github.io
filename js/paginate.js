// Pagination
// Copyright (c) 2016 Christopher Harrison
// MIT License
(function(root) {
  var exportName = 'paginate';

  var formatDate = function(date) {
    var day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()],
        ordinal = ['th', 'st', 'nd', 'rd'][date.getDate() % 10 < 4 ? (date.getDate() % 10) * (parseInt(date.getDate() / 10, 10) % 10 == 1 ? 0 : 1) : 0],
        month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];

    return day + ', ' + date.getDate() + ordinal + ' ' + month + ' ' + date.getFullYear();
  };

  var Post = function(post) {
    this.title = post.title;
    this.date = new Date(post.date);
    this.url = post.url;
    this.description = post.description;

    this.toDOM = function() {
      var node = root.document.createElement('li');
      node.innerHTML = '<h2><a class="post-title" href="' + this.url + '">' + this.title + '</a></h2>'
                     + '<p class="post-meta">' + formatDate(this.date) + '</p>'
                     + '<p class="post-description">' + this.description + '</p>';

      return node;
    };
  };

  var deserialise = function(post) {
    return new Post(post);
  };

  var byDateThenTitle = function(postA, postB) {
    // Sort post by date (reverse chronological) then title
    return postB.date - postA.date
        || postB.title > postA.title ? -1 : 1;
  };

  var paginate = function(posts, perPage) {
    var postList = root.document.getElementById('post-list'),
        canon = posts.map(deserialise).sort(byDateThenTitle);

    canon.forEach(function(post) {
      postList.appendChild(post.toDOM());
    });
  };

  // Export function
  if (root.hasOwnProperty(exportName)) {
    throw new Error('Cannot export pagination function into root namespace')
  }
  root[exportName] = paginate;
})(window);
