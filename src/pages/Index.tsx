import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

type Category = 'all' | 'residential' | 'commercial' | 'public';

interface Project {
  id: number;
  title: string;
  category: Category;
  image: string;
  year: string;
  location: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Вилла на побережье',
    category: 'residential',
    image: 'https://cdn.poehali.dev/projects/6f9d9dc9-2132-46d2-94bd-65f1f2142b43/files/be29146d-92d3-49c7-b937-89bc7bbd15a6.jpg',
    year: '2024',
    location: 'Сочи'
  },
  {
    id: 2,
    title: 'Бизнес-центр «Горизонт»',
    category: 'commercial',
    image: 'https://cdn.poehali.dev/projects/6f9d9dc9-2132-46d2-94bd-65f1f2142b43/files/39461170-d51c-4bb7-82ef-2ba66d2925cf.jpg',
    year: '2023',
    location: 'Москва'
  },
  {
    id: 3,
    title: 'Культурный центр',
    category: 'public',
    image: 'https://cdn.poehali.dev/projects/6f9d9dc9-2132-46d2-94bd-65f1f2142b43/files/56946ea0-7a7b-4282-b8ed-3ba265786edc.jpg',
    year: '2023',
    location: 'Санкт-Петербург'
  }
];

const services = [
  {
    icon: 'Building2',
    title: 'Архитектурное проектирование',
    description: 'Разработка концепций и рабочих проектов жилых и коммерческих зданий'
  },
  {
    icon: 'Lightbulb',
    title: 'Дизайн интерьеров',
    description: 'Создание уникальных интерьерных решений для частных и общественных пространств'
  },
  {
    icon: 'FileCheck',
    title: 'Авторский надзор',
    description: 'Контроль качества строительных работ и соблюдения проектной документации'
  },
  {
    icon: 'Ruler',
    title: '3D визуализация',
    description: 'Фотореалистичные визуализации проектов для презентации заказчикам'
  }
];

export default function Index() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Спасибо за ваше сообщение! Я свяжусь с вами в ближайшее время.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b border-border z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="font-heading text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            АрхДизайн
          </h1>
          <div className="hidden md:flex gap-8">
            <a href="#portfolio" className="hover:text-primary transition-colors">Портфолио</a>
            <a href="#about" className="hover:text-primary transition-colors">О себе</a>
            <a href="#services" className="hover:text-primary transition-colors">Услуги</a>
            <a href="#contact" className="hover:text-primary transition-colors">Контакты</a>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 blur-3xl" />
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h2 className="font-heading text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Создаю пространства будущего
            </h2>
            <p className="text-xl text-muted-foreground mb-8 animate-slide-up">
              Современная архитектура с акцентом на функциональность и эстетику
            </p>
            <div className="flex gap-4 justify-center animate-scale-in">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <a href="#portfolio">Посмотреть проекты</a>
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <a href="#contact">Связаться</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-6">
        <div className="container mx-auto">
          <h3 className="font-heading text-4xl font-bold text-center mb-4">Портфолио</h3>
          <p className="text-center text-muted-foreground mb-12">Избранные проекты</p>
          
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {(['all', 'residential', 'commercial', 'public'] as Category[]).map(cat => (
              <Button
                key={cat}
                variant={activeCategory === cat ? 'default' : 'outline'}
                onClick={() => setActiveCategory(cat)}
                className={activeCategory === cat ? 'bg-primary' : 'border-border hover:border-primary'}
              >
                {cat === 'all' && 'Все проекты'}
                {cat === 'residential' && 'Жилые'}
                {cat === 'commercial' && 'Коммерческие'}
                {cat === 'public' && 'Общественные'}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <Card 
                key={project.id} 
                className="group overflow-hidden border-border hover:border-primary transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 animate-fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6">
                  <h4 className="font-heading text-xl font-semibold mb-2">{project.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Calendar" size={16} />
                      {project.year}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="MapPin" size={16} />
                      {project.location}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-6 bg-card/50">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-heading text-4xl font-bold mb-6">Обо мне</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Более 10 лет я создаю архитектурные решения, которые объединяют функциональность, эстетику и устойчивое развитие.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Мой подход основан на глубоком понимании потребностей заказчика и контекста окружающей среды. Каждый проект — это уникальная история, воплощенная в камне, стекле и металле.
              </p>
              <div className="flex gap-4 mt-6">
                <Button variant="outline" size="icon" className="border-primary hover:bg-primary/10">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button variant="outline" size="icon" className="border-primary hover:bg-primary/10">
                  <Icon name="Linkedin" size={20} />
                </Button>
                <Button variant="outline" size="icon" className="border-primary hover:bg-primary/10">
                  <Icon name="Mail" size={20} />
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl blur-2xl" />
              <div className="relative bg-card border border-border rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-4xl font-heading font-bold text-primary mb-2">50+</div>
                    <div className="text-sm text-muted-foreground">Реализованных проектов</div>
                  </div>
                  <div>
                    <div className="text-4xl font-heading font-bold text-secondary mb-2">10+</div>
                    <div className="text-sm text-muted-foreground">Лет опыта</div>
                  </div>
                  <div>
                    <div className="text-4xl font-heading font-bold text-accent mb-2">15+</div>
                    <div className="text-sm text-muted-foreground">Наград</div>
                  </div>
                  <div>
                    <div className="text-4xl font-heading font-bold text-primary mb-2">100%</div>
                    <div className="text-sm text-muted-foreground">Довольных клиентов</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-6">
        <div className="container mx-auto">
          <h3 className="font-heading text-4xl font-bold text-center mb-4">Услуги</h3>
          <p className="text-center text-muted-foreground mb-12">Комплексный подход к созданию архитектуры</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, idx) => (
              <Card 
                key={idx}
                className="border-border hover:border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 group"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon name={service.icon as any} size={32} className="text-primary" />
                  </div>
                  <h4 className="font-heading text-lg font-semibold mb-3">{service.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-6 bg-card/50">
        <div className="container mx-auto max-w-2xl">
          <h3 className="font-heading text-4xl font-bold text-center mb-4">Контакты</h3>
          <p className="text-center text-muted-foreground mb-12">Давайте обсудим ваш проект</p>
          
          <Card className="border-border">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Ваше имя</label>
                  <Input 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Иван Иванов"
                    required
                    className="border-border focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="ivan@example.com"
                    required
                    className="border-border focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Сообщение</label>
                  <Textarea 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Расскажите о вашем проекте..."
                    rows={5}
                    required
                    className="border-border focus:border-primary resize-none"
                  />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90" size="lg">
                  Отправить сообщение
                  <Icon name="Send" size={18} className="ml-2" />
                </Button>
              </form>

              <div className="mt-8 pt-8 border-t border-border">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Icon name="Mail" size={20} className="text-primary" />
                    <span>info@archdesign.ru</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Icon name="Phone" size={20} className="text-primary" />
                    <span>+7 (999) 123-45-67</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Icon name="MapPin" size={20} className="text-primary" />
                    <span>Москва, Россия</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-8 px-6 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 АрхДизайн. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}
