import { PostService } from "src/app/post.service";
import { PostsComponent } from "./posts.component";
import { Post } from "src/app/models/posts";
import { of } from "rxjs";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Component, Input } from "@angular/core";
import { By } from "@angular/platform-browser";
import { PostComponent } from "../post/post.component";

// class mockPostServiceClass{
//     getPosts(){}

//     deletePost(post: Post) {
//         return of(true);
//     }
// }

@Component({
    selector: 'app-post',
    template: '<div></div>'
})
class FakePostComponent {
    @Input() post!: Post;
}

describe('posts component', () => {
    let mockPostService: any;
    //let postService : any;
    let component: PostsComponent;
    let data: Post[];
    let fixture: ComponentFixture<PostsComponent>;

    beforeEach(() => {
        data = [
            {
                userId: 101,
                id: 1,
                title: 'title 1',
                body: 'body 1'
            },
            {
                userId: 102,
                id: 2,
                title: 'title 2',
                body: 'body 2'
            },
            {
                userId: 103,
                id: 3,
                title: 'title 3',
                body: 'body 3'
            }
        ];

        mockPostService = jasmine.createSpyObj('PostService', ['deletePost', 'getPosts']);

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule
            ],
            declarations: [PostsComponent, PostComponent],
            providers: [
                {
                    provide: PostService,
                    useValue: mockPostService
                },
            ]
        });

        fixture = TestBed.createComponent(PostsComponent);
        component = fixture.componentInstance;
    });

    describe('delete', () => {

        beforeEach(() => {
            component.posts = data;
            mockPostService.deletePost.and.returnValue(of(true));
        });

        it('checking the delete post is working', () => {
            component.deletePost(data[1]);
            //expect(component.posts.length).toBe(2);
            expect(mockPostService.deletePost).toHaveBeenCalledTimes(1);
        });

        it('should set the post property when ng on init will be called', () => {
            mockPostService.getPosts.and.returnValue(of(data));
            fixture.detectChanges();
            expect(component.posts.length).toBe(3);
        });

        it('it should create one post child component for each post', () => {
            mockPostService.getPosts.and.returnValue(of(data));
            fixture.detectChanges();
            const de = fixture.debugElement.queryAll(By.css('.ngclass'))
            expect(de.length).toBe(data.length);
        });

        it('it should create same number of post component as data length', () => {
            mockPostService.getPosts.and.returnValue(of(data));
            fixture.detectChanges();
            const de = fixture.debugElement.queryAll(By.directive(PostComponent))
            expect(de.length).toBe(data.length);
        });

        it('it should pass the the correct post data to post compoent', () => {
            mockPostService.getPosts.and.returnValue(of(data));
            fixture.detectChanges();
            const de = fixture.debugElement.queryAll(By.directive(PostComponent))

            for (let index = 0; index < de.length; index++) {

                const postComponent: PostComponent = de[index].componentInstance as PostComponent;

                expect(postComponent.post.title).toEqual(data[index].title);

            }

            expect(de.length).toBe(data.length);
        });

        it('delete method should be called when delete item is clicked', () => {
            spyOn(component, 'deletePost');
            mockPostService.getPosts.and.returnValue(of(data));
            fixture.detectChanges();

            const postComponentDEs = fixture.debugElement.queryAll(By.directive(PostComponent))

            for (let index = 0; index < postComponentDEs.length; index++) {

                postComponentDEs[index].query(By.css('button')).triggerEventHandler('click', {});
                expect(component.deletePost).toHaveBeenCalledWith(data[index]);
            }
        });

        it('delete method should be called when delete item is clicked', () => {
            spyOn(component, 'deletePost');
            mockPostService.getPosts.and.returnValue(of(data));
            fixture.detectChanges();

            const postComponentDEs = fixture.debugElement.queryAll(By.directive(PostComponent))

            for (let index = 0; index < postComponentDEs.length; index++) {

                postComponentDEs[index].query(By.css('button')).triggerEventHandler('click', {});
                expect(component.deletePost).toHaveBeenCalledWith(data[index]);
            }
        });

        it('delete method should be called when delete is emitted', () => {
            spyOn(component, 'deletePost');
            mockPostService.getPosts.and.returnValue(of(data));
            fixture.detectChanges();

            const postComponentDEs = fixture.debugElement.queryAll(By.directive(PostComponent))

            for (let index = 0; index < postComponentDEs.length; index++) {

                (postComponentDEs[index].componentInstance as PostComponent).delete.emit(data[index]);                                
                expect(component.deletePost).toHaveBeenCalledWith(data[index]);
            }
        });

    });

});