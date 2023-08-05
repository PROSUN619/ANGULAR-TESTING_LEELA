import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/posts';
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  
  posts! : Post[];

  constructor(private postService : PostService) { }

  ngOnInit(): void {
    this.getPost();
  }

  getPost(){
    this.postService.getPosts().subscribe({
      next: data => this.posts = data
    });
  }
  
  deletePost(post : Post){
    this.posts = this.posts.filter(x => x.id != post.id);
    this.postService.deletePost(post).subscribe();
  }

  

}
