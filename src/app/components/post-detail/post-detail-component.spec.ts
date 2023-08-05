import { ComponentFixture, TestBed } from "@angular/core/testing";
import { PostDetailComponent } from "./post-detail.component";
import { PostService } from "src/app/post.service";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { By } from "@angular/platform-browser";
import { Post } from "src/app/models/posts";

fdescribe('post detail component', () => {

    let fixture: ComponentFixture<PostDetailComponent>;
    let mockLocationObj: Location;
    let mockPostServiceObj: jasmine.SpyObj<PostService>;

    const mockActiatedRoute = {
        snapshot: {
            paramMap: {
                get: () => {
                    return '3';
                }
            }
        }
    }

    beforeEach(() => {
        mockLocationObj = jasmine.createSpyObj('Location', ['back']);
        mockPostServiceObj = jasmine.createSpyObj('PostService', ['getPost', 'updatePost']);

        TestBed.configureTestingModule({
            declarations: [PostDetailComponent],
            providers: [
                {
                    provide: Location,
                    useValue: mockLocationObj
                },
                {
                    provide: PostService,
                    useValue: mockPostServiceObj
                },
                {
                    provide: ActivatedRoute,
                    useValue: mockActiatedRoute
                },
            ]
        });

        fixture = TestBed.createComponent(PostDetailComponent);
    });

    it('should render the post title in h2 ', () => {

        mockPostServiceObj.getPost.and.returnValue(of(
            {
                userId: 3,
                id: 103,
                title: 'Title 3',
                body: 'Body 3'
            } as Post
        ));

        fixture.detectChanges();

        const element = fixture.debugElement.query(By.css('h2')).nativeElement as HTMLElement;
        console.log(element.textContent);    
        console.log(element.textContent);
        expect(element.textContent).toBe(fixture.componentInstance.post.title);

    })

});