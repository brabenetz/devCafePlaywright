import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { DepatureComponent } from './departure.component';
import { FlightService } from '../../../booking/api-boarding';

let delay = (t: number) => {
    return new Promise(resolve => setTimeout(resolve, t));
}

describe('DepartureComponent', () => {
  let component: DepatureComponent;
  let fixture: ComponentFixture<DepatureComponent>;
  let testingController: HttpTestingController;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      declarations: [DepatureComponent],
      providers: [
        FlightService,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepatureComponent);
    component = fixture.componentInstance;
    testingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show results', async() => {

    // enter search value and wait for debounce:
    component.control.setValue('test');
    await delay(500); // wait for debounce (WARN: a fixed wait in tests is always bad code!)

    // mock backend response and trigger Change-Detection:
    const flightReq = testingController.expectOne('/api/flight?from=test&to=');
    flightReq.flush(Object.values([
      {
        "id": 1270,
        "from": "London",
        "to": "New York",
        "date": "2024-10-25T23:49:39.6922717+00:00",
        "delayed": false,
        "flightBookings": []
      },
      {
        "id": 1271,
        "from": "London",
        "to": "New York",
        "date": "2024-10-26T23:49:39.692272+00:00",
        "delayed": true,
        "flightBookings": []
      }]));
    fixture.detectChanges(); // trigger async pipe.

    // verify results:
    const resultEl = el.queryAll(By.css('.table.table-condensed'))[0];
    const resultText = resultEl.nativeElement.textContent;
    expect(resultText).toContain('1270');
    expect(resultText).toContain('London');
    expect(resultText).toContain('New York');
    expect(resultText).toContain('1271');
  });
});
