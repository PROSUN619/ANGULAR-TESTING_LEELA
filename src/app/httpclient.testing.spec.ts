import { HttpClient } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'

const url = '/data';
interface data {
    name : string
}

describe('Http Client Testing', () => {
    let httpClient : HttpClient;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });    
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
    });
    
    it('it should call test URL with get request', (done : DoneFn) => {
        const testData = {'name' : 'Prasun Chakraborty'}        
        httpClient.get<data>(url).subscribe({
            next : data => {expect(data).toEqual(testData)},
            error: error => console.log(error),
            complete: () => done()
        });

        const testRequest = httpTestingController.expectOne('/data');
        testRequest.flush(testData);
    });

    it('it should test multiple request', () =>{
        const dataArr : data[] = [{name : 'C#'}, {name : 'ASP.NET'}, {name : 'Oracle'}]
        
        httpClient.get<data>(url).subscribe((data) => {
            expect(data).toEqual(dataArr[0]);
        });

        httpClient.get<data>(url).subscribe((data) => {
            expect(data).toEqual(dataArr[1]);
        });

        httpClient.get<data>(url).subscribe((data) => {
            expect(data).toEqual(dataArr[2]);
        });

        const request = httpTestingController.match(url);

        request[0].flush(dataArr[0]);
        request[1].flush(dataArr[1]);
        request[2].flush(dataArr[2]);

        expect(request.length).toBe(3);

    })

});