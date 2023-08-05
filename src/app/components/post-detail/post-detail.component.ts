import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/posts';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})

export class PostDetailComponent implements OnInit {

  post!: Post

  constructor(private route: ActivatedRoute, private postService: PostService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getPost();
  }

  getPost() {
    const id = this.route.snapshot.paramMap.get('id');
    this.postService.getPost(Number(id)).subscribe(data => {
      this.post = data;
    });
  }

  goBack() {
    this.location.back();
  }

  save() {
    this.postService.updatePost(this.post).subscribe(() => {
      this.location.back();
    });
  }


}
