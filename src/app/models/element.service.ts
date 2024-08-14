import { Injectable } from '@angular/core';
import { Element } from './element.model';

@Injectable({
  providedIn: 'root'
})
export class ElementService {
  private elements: Element[] = [];
  private nextId = 1;

  constructor() {
    this.loadElements();  // Загружаем данные при инициализации сервиса
  }

  private saveElements(): void {
    localStorage.setItem('elements', JSON.stringify(this.elements));
  }

  private loadElements(): void {
    const data = localStorage.getItem('elements');
    if (data) {
      this.elements = JSON.parse(data);
      this.nextId = this.elements.length ? Math.max(...this.elements.map(e => e.id)) + 1 : 1;
    }
  }

  getElements(): Element[] {
    return this.elements;
  }

  addElement(element: Omit<Element, 'id' | 'creationDate'>): void {
    this.elements.push({
      ...element,
      id: this.nextId++,
      creationDate: new Date(),
    });
    this.saveElements();  // Сохраняем данные после добавления элемента
  }

  deleteElement(id: number): void {
    this.elements = this.elements.filter(element => element.id !== id);
    this.saveElements();  // Сохраняем данные после удаления элемента
  }

  getElementById(id: number): Element | undefined {
    return this.elements.find(element => element.id === id);
  }

  updateElement(id: number, updatedElement: Partial<Element>): void {
    const element = this.getElementById(id);
    if (element) {
      Object.assign(element, updatedElement);
      this.saveElements();  // Сохраняем данные после обновления элемента
    }
  }

  updateElementList(elements: Element[]): void {
    this.elements = elements;
    this.saveElements();  // Сохраняем обновленный список элементов
  }
}