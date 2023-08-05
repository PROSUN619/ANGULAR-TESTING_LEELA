import { HttpClient } from "@angular/common/http";
import { PostService } from "./post.service";
import { of } from "rxjs";
import { Post } from "./models/posts";

describe('Post Service', () => {
    let httpClientSpy : jasmine.SpyObj<HttpClient>;
    let postService : PostService;
    let POSTS : Post[];

    beforeEach(() => {
        httpClientSpy = jasmine.createSpyObj('httpClient', ['get']);
        postService =  new PostService(httpClientSpy);

        POSTS  = [
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

    });

    it('should return expected post when getposts is called', (done : DoneFn) => {
        httpClientSpy.get.and.returnValue(of(POSTS));

        postService.getPosts().subscribe({
            next: data => { 
                expect(data).toEqual(POSTS);
                done();
            },
            error : error => {
                done.fail();
            }
        });
        expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    })
});