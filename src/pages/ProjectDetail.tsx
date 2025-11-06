import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { projects } from '@/data/projects';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find(p => p.id === Number(id));
  const [selectedImage, setSelectedImage] = useState(0);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Проект не найден</h1>
          <Link to="/">
            <Button>Вернуться на главную</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/">
            <h1 className="font-heading text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              АрхДизайн
            </h1>
          </Link>
          <Link to="/#portfolio">
            <Button variant="ghost" size="sm">
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              К портфолио
            </Button>
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              {project.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Icon name="MapPin" size={18} />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Calendar" size={18} />
                <span>{project.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Maximize2" size={18} />
                <span>{project.area}</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img 
                  src={project.gallery[selectedImage]} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-4 gap-4">
                {project.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-video rounded-lg overflow-hidden transition-all ${
                      selectedImage === index 
                        ? 'ring-2 ring-primary' 
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${project.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-4">О проекте</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <div className="text-muted-foreground mb-1">Заказчик</div>
                      <div className="font-medium">{project.client}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Площадь</div>
                      <div className="font-medium">{project.area}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Год реализации</div>
                      <div className="font-medium">{project.year}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground mb-1">Местоположение</div>
                      <div className="font-medium">{project.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-4">Архитектор</h3>
                  <p className="font-medium">Александр Орлов</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Главный архитектор проекта
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="space-y-8">
            <Card>
              <CardContent className="p-8">
                <h2 className="font-heading text-2xl font-bold mb-4">Описание</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <h2 className="font-heading text-2xl font-bold mb-4">Концепция</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {project.details.concept}
                </p>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardContent className="p-8">
                  <h2 className="font-heading text-2xl font-bold mb-4">Материалы</h2>
                  <ul className="space-y-3">
                    {project.details.materials.map((material, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Icon name="CheckCircle2" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{material}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-8">
                  <h2 className="font-heading text-2xl font-bold mb-4">Особенности</h2>
                  <ul className="space-y-3">
                    {project.details.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Icon name="Star" size={20} className="text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/#contact">
              <Button size="lg" className="gap-2">
                Обсудить свой проект
                <Icon name="ArrowRight" size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <footer className="bg-card py-12 px-6 border-t border-border">
        <div className="container mx-auto text-center">
          <h2 className="font-heading text-2xl font-bold mb-4">Александр Орлов</h2>
          <p className="text-muted-foreground mb-6">Архитектор</p>
          <div className="flex justify-center gap-6 mb-6">
            <a href="mailto:orlov@example.com" className="text-muted-foreground hover:text-primary transition-colors">
              <Icon name="Mail" size={24} />
            </a>
            <a href="tel:+79001234567" className="text-muted-foreground hover:text-primary transition-colors">
              <Icon name="Phone" size={24} />
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Александр Орлов. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
}
