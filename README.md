# Memory Allocation Simulator (First Fit / Best Fit)

## 1. Objetivo del proyecto

Este proyecto implementa un **simulador de asignación dinámica de memoria** inspirado en cómo los sistemas operativos gestionan la memoria principal.

El simulador permite visualizar cómo los procesos son asignados a bloques de memoria utilizando dos algoritmos clásicos de gestión de memoria:

* **First Fit**
* **Best Fit**

El objetivo principal es **mostrar de forma interactiva** cómo funcionan estos algoritmos, cómo se produce la **fragmentación de memoria**, y cómo los sistemas pueden gestionar procesos cuando la memoria se encuentra llena.

El sistema también implementa comportamientos comunes en sistemas operativos reales, como:

* **División de bloques de memoria (splitting)**
* **Fusión de bloques libres contiguos (coalescing)**
* **Cola de procesos en espera**
* **Procesos con duración limitada o ilimitada**
* **Cambio dinámico de algoritmo de asignación**

Este simulador separa completamente la **lógica del sistema** de la **interfaz visual**, siguiendo principios de diseño como **SOLID** y **encapsulamiento**, permitiendo que la lógica pueda ser reutilizada o testeada independientemente de la UI.

---

# 2. Arquitectura del sistema

El proyecto está organizado en varios módulos que representan las diferentes responsabilidades del simulador.

Las clases principales del sistema son:

```
Process
MemoryBlock
Memory
AllocationStrategy
MemoryAllocator
ProcessQueue
MemoryManager
```

Cada una cumple una función específica dentro del modelo del sistema.

---

# Process

La clase `Process` representa un **proceso que solicita memoria**.

Cada proceso contiene:

* un identificador único
* un nombre (por ejemplo P1, P2, etc.)
* el tamaño de memoria requerido
* una duración opcional
* un estado de ejecución

Los procesos pueden tener dos comportamientos:

1. **Procesos temporizados**
   Tienen una duración definida y se eliminan automáticamente cuando el tiempo llega a cero.

2. **Procesos ilimitados**
   Permanecen en memoria hasta que el usuario los elimine manualmente.

La clase también permite:

* pausar un proceso
* reanudarlo
* finalizarlo manualmente

Esto permite simular comportamientos similares a los estados de procesos en sistemas operativos.

---

# MemoryBlock

`MemoryBlock` representa **un segmento contiguo de memoria**.

Cada bloque contiene:

* dirección inicial (`start`)
* tamaño del bloque
* proceso asignado (si existe)

Un bloque se considera **libre** cuando no tiene un proceso asignado.

Esta estructura permite representar la memoria como una lista de segmentos que pueden ser:

```
| P1 | FREE | P2 | FREE |
```

Cada uno de estos segmentos es un `MemoryBlock`.

---

# Memory

La clase `Memory` representa **la memoria completa del sistema**.

Internamente mantiene una lista ordenada de `MemoryBlock`.

Esta clase se encarga de:

* dividir bloques cuando un proceso ocupa solo parte del espacio (**splitting**)
* liberar bloques cuando un proceso termina
* fusionar bloques libres contiguos (**coalescing**)

Por ejemplo, si dos bloques libres quedan juntos:

```
| FREE 4 | FREE 6 |
```

se fusionan automáticamente en:

```
| FREE 10 |
```

Esto simula el comportamiento real de los gestores de memoria en sistemas operativos.

---

# AllocationStrategy

`AllocationStrategy` define una **interfaz para los algoritmos de asignación de memoria**.

Esto permite cambiar el algoritmo utilizado sin modificar el sistema principal.

Actualmente se implementan dos estrategias:

### First Fit

Busca el **primer bloque libre suficientemente grande** para almacenar el proceso.

Es rápido porque no recorre toda la memoria, pero puede generar mayor fragmentación.

### Best Fit

Busca el **bloque libre más pequeño posible que pueda contener el proceso**.

Este algoritmo intenta minimizar la fragmentación, aunque requiere revisar más bloques.

El sistema utiliza **Strategy Pattern** para cambiar entre estos algoritmos dinámicamente.

---

# MemoryAllocator

`MemoryAllocator` es el componente encargado de **aplicar el algoritmo de asignación sobre la memoria**.

Su funcionamiento es:

1. utilizar la estrategia de asignación para encontrar un bloque adecuado
2. ordenar a `Memory` que realice la asignación en ese bloque

De esta manera se mantiene separada la lógica del algoritmo de la manipulación real de la memoria.

---

# ProcessQueue

`ProcessQueue` implementa una **cola FIFO de procesos en espera**.

Cuando la memoria está llena y un nuevo proceso intenta ejecutarse, el proceso se añade a esta cola.

Cuando se libera memoria, el sistema intenta asignar nuevamente los procesos en espera.

Esto simula el comportamiento de sistemas donde los procesos deben esperar recursos disponibles.

---

# MemoryManager

`MemoryManager` es el **orquestador principal del sistema**.

Coordina todos los componentes del simulador:

* memoria
* algoritmos de asignación
* cola de procesos
* temporizadores

Las principales responsabilidades de esta clase son:

* añadir procesos al sistema
* liberar procesos de la memoria
* procesar la cola de espera
* ejecutar los temporizadores
* cambiar el algoritmo de asignación dinámicamente

La interfaz gráfica del sistema interactúa **exclusivamente con esta clase**, lo que mantiene completamente separada la lógica del simulador de la capa visual.

---

# Flujo general del sistema

1. Un proceso solicita memoria
2. El sistema intenta asignarlo usando el algoritmo actual
3. Si hay espacio disponible, el proceso se asigna
4. Si no hay espacio, el proceso se envía a la cola de espera
5. Cuando un proceso termina o se libera memoria, el sistema intenta ejecutar nuevamente los procesos en espera

---

# Tecnologías utilizadas

* **TypeScript**
* **React**
* Arquitectura basada en **separación de dominio y UI**
* Principios de diseño **SOLID**

---

# Propósito educativo

Este proyecto está diseñado principalmente como una **herramienta educativa** para comprender:

* gestión dinámica de memoria
* fragmentación externa
* algoritmos de asignación
* estructuras internas de un gestor de memoria
* diseño de software modular

El simulador permite observar visualmente cómo los procesos ocupan memoria y cómo diferentes algoritmos afectan la distribución de los bloques.
