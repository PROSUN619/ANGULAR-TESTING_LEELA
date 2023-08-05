import { first } from 'rxjs/operators';
import { Post } from "src/app/models/posts";
import { PostComponent } from "./post.component";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Post Component', () => {
    let fixture: ComponentFixture<PostComponent>;
    let postComponent: PostComponent;
    let post: Post;

    beforeEach(() => {
        TestBed.configureTestingModule(
            { 
                declarations: [PostComponent],
                schemas: [NO_ERRORS_SCHEMA]
            }
        );

        fixture = TestBed.createComponent(PostComponent);
        postComponent = fixture.componentInstance;
        post= { id: 1, userId: 101, body: 'body 1', title: 'dsdsd' };
        postComponent.post = post;
    });

    it('should create a post component using TestBed', () => {
        expect(postComponent).toBeDefined();
    })

    it('should render the post title in the anchor element', () => {
        fixture.detectChanges();
        const postElement : HTMLElement = fixture.nativeElement;
        const a = postElement.querySelector('a');
        expect(a?.textContent).toContain(post.title);
    });

    it('should render the post title in the anchor element using debug element', () => {
        fixture.detectChanges();
        const postElement : DebugElement = fixture.debugElement;
        const a : HTMLElement = postElement.query(By.css('a')).nativeElement;
        expect(a.textContent).toContain(post.title);
    });


    it('should raise an event when the delete post is clicked', () => {
        postComponent.delete.pipe(first()).subscribe((selectedPost) => {
            console.log(selectedPost);
            console.log(post);
            expect(selectedPost).toEqual(post);
            //expect(1).toEqual(1);
        });

        postComponent.deletePost();
    })
});