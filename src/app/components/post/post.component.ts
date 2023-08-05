import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/models/posts';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  @Input() post!: Post;
  @Output() delete = new EventEmitter<Post>();


  deletePost() {
    //event.stopPropagation();
    //console.log(this.post);
    this.delete.emit(this.post);
  }

}
