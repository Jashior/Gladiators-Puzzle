import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let activeLink = null;

window.addEventListener('scroll', () => {
  $$('.section').forEach((section) => {
    const { y } = section.getBoundingClientRect();

    if (y <= 0) {
      if (activeLink != null) {
        activeLink.classList.remove('active');
      }

      activeLink = $(`.nav-link[href~="#${section.id}"]`);
      activeLink.classList.add('active');
    }
  });
});
