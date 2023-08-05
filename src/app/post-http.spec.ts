import { TestBed } from "@angular/core/testing";
import { PostService } from "./post.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { Post } from "./models/posts";

describe('should check the getPosts() using HttpTestingController', () => {
    let postService: PostService;
    let httpTestingController: HttpTestingController;

    const POSTS: Post[] = [
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

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PostService],
            imports: [HttpClientTestingModule]
        });

        postService = TestBed.inject(PostService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });


    it('it should call test URL with get request', (done: DoneFn) => {

        postService.getPosts().subscribe({
            next: data => { expect(data).toEqual(POSTS) },
            error: error => console.log(error),
            complete: () => done()
        });

        const testRequest = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts');
        testRequest.flush(POSTS);
        expect(testRequest.request.method).toBe('GET');
    });

    it('http delete url should call only once', () => {
        postService.deletePostbyNumber(1).subscribe(data => {

        });

        // postService.deletePostbyNumber(2).subscribe(data => {

        // });

        const testRequest = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts/1');
        
        expect(testRequest.request.method).toBe('DELETE');
        httpTestingController.verify(); // this will verify the URL with passed on parameter
    });

});