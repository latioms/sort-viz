// Définition des algorithmes de tri avec leurs explications et pseudo-code

const algorithms = {
    bubble: {
        name: "Tri à Bulles (Bubble Sort)",
        icon: "🫧",
        description: "Compare et échange répétitivement les éléments adjacents et les échange s'ils sont dans le mauvais ordre. Les plus grands éléments 'remontent' vers la fin comme des bulles.",
        complexity: {
            time: "O(n²) dans le pire cas, O(n) dans le meilleur cas",
            space: "O(1) - tri en place",
            stable: "Oui - préserve l'ordre relatif des éléments égaux"
        },
        steps: [
            "Parcourir le tableau de gauche à droite",
            "Comparer chaque paire d'éléments adjacents",
            "Échanger si l'élément de gauche > élément de droite",
            "Répéter jusqu'à ce qu'aucun échange ne soit nécessaire",
            "Chaque passage garantit qu'au moins un élément est à sa place finale"
        ],
        pseudocode: `ALGORITHME TriABulles(tableau)
DÉBUT
    n ← longueur(tableau)
    
    POUR i DE 0 À n-1 FAIRE
        échangé ← FAUX
        
        POUR j DE 0 À n-i-2 FAIRE
            SI tableau[j] > tableau[j+1] ALORS
                échanger(tableau[j], tableau[j+1])
                échangé ← VRAI
            FIN SI
        FIN POUR
        
        SI échangé = FAUX ALORS
            SORTIR // Tableau déjà trié
        FIN SI
    FIN POUR
FIN`,
        
        async sort(array, visualizer) {
            const n = array.length;
            
            for (let i = 0; i < n - 1; i++) {
                visualizer.highlightCode(2); // POUR i
                let swapped = false;
                
                visualizer.highlightCode(3); // échangé ← FAUX
                await visualizer.delay();
                
                for (let j = 0; j < n - i - 1; j++) {
                    visualizer.highlightCode(5); // POUR j
                    await visualizer.delay();
                    
                    // Marquer les éléments en cours de comparaison
                    visualizer.highlightCode(6); // SI tableau[j] > tableau[j+1]
                    visualizer.setComparing([j, j + 1]);
                    visualizer.incrementComparisons();
                    await visualizer.delay();
                    
                    if (array[j] > array[j + 1]) {
                        visualizer.highlightCode(7); // échanger
                        visualizer.setSwapping([j, j + 1]);
                        await visualizer.delay();
                        
                        // Effectuer l'échange
                        [array[j], array[j + 1]] = [array[j + 1], array[j]];
                        visualizer.incrementSwaps();
                        swapped = true;
                        
                        visualizer.highlightCode(8); // échangé ← VRAI
                        await visualizer.delay();
                    }
                    
                    visualizer.clearHighlights();
                }
                
                // Marquer l'élément comme trié
                visualizer.setSorted([n - i - 1]);
                
                visualizer.highlightCode(12); // SI échangé = FAUX
                if (!swapped) {
                    visualizer.highlightCode(13); // SORTIR
                    break;
                }
            }
            
            // Marquer tous les éléments comme triés
            for (let i = 0; i < n; i++) {
                visualizer.setSorted([i]);
            }
        }
    },

    insertion: {
        name: "Tri par Insertion (Insertion Sort)",
        icon: "📝",
        description: "Insère chaque élément dans la bonne position par rapport aux éléments précédents déjà triés. Similaire à la façon dont on trie des cartes dans sa main.",
        complexity: {
            time: "O(n²) dans le pire cas, O(n) dans le meilleur cas",
            space: "O(1) - tri en place",
            stable: "Oui - préserve l'ordre relatif des éléments égaux"
        },
        steps: [
            "Commencer avec le deuxième élément (indice 1)",
            "Comparer avec les éléments précédents",
            "Décaler les éléments plus grands vers la droite",
            "Insérer l'élément à sa position correcte",
            "Répéter pour tous les éléments restants"
        ],
        pseudocode: `ALGORITHME TriParInsertion(tableau)
DÉBUT
    n ← longueur(tableau)
    
    POUR i DE 1 À n-1 FAIRE
        clé ← tableau[i]
        j ← i - 1
        
        TANT QUE j >= 0 ET tableau[j] > clé FAIRE
            tableau[j + 1] ← tableau[j]
            j ← j - 1
        FIN TANT QUE
        
        tableau[j + 1] ← clé
    FIN POUR
FIN`,
        
        async sort(array, visualizer) {
            const n = array.length;
            
            // Le premier élément est considéré comme trié
            visualizer.setSorted([0]);
            
            for (let i = 1; i < n; i++) {
                visualizer.highlightCode(3); // POUR i
                let key = array[i];
                let j = i - 1;
                
                visualizer.highlightCode(4); // clé ← tableau[i]
                visualizer.setComparing([i]);
                await visualizer.delay();
                
                visualizer.highlightCode(5); // j ← i - 1
                await visualizer.delay();
                
                // Décaler les éléments plus grands vers la droite
                visualizer.highlightCode(7); // TANT QUE
                while (j >= 0 && array[j] > key) {
                    visualizer.setComparing([j, i]);
                    visualizer.incrementComparisons();
                    await visualizer.delay();
                    
                    visualizer.highlightCode(8); // tableau[j + 1] ← tableau[j]
                    array[j + 1] = array[j];
                    visualizer.incrementSwaps();
                    await visualizer.delay();
                    
                    visualizer.highlightCode(9); // j ← j - 1
                    j--;
                    await visualizer.delay();
                }
                
                // Insérer la clé à sa position
                visualizer.highlightCode(12); // tableau[j + 1] ← clé
                array[j + 1] = key;
                visualizer.setSorted([j + 1]);
                await visualizer.delay();
                
                visualizer.clearHighlights();
            }
            
            // Marquer tous les éléments comme triés
            for (let i = 0; i < n; i++) {
                visualizer.setSorted([i]);
            }
        }
    },

    selection: {
        name: "Tri par Sélection (Selection Sort)",
        icon: "🎯",
        description: "Cherche le minimum à chaque itération et le place à sa position finale. Divise le tableau en deux parties : triée et non-triée.",
        complexity: {
            time: "O(n²) dans tous les cas",
            space: "O(1) - tri en place",
            stable: "Non - peut changer l'ordre relatif des éléments égaux"
        },
        steps: [
            "Trouver le minimum dans la partie non-triée",
            "Échanger avec le premier élément non-trié",
            "Étendre la partie triée d'un élément",
            "Répéter jusqu'à ce que tout soit trié"
        ],
        pseudocode: `ALGORITHME TriParSelection(tableau)
DÉBUT
    n ← longueur(tableau)
    
    POUR i DE 0 À n-2 FAIRE
        indiceMin ← i
        
        POUR j DE i+1 À n-1 FAIRE
            SI tableau[j] < tableau[indiceMin] ALORS
                indiceMin ← j
            FIN SI
        FIN POUR
        
        SI indiceMin ≠ i ALORS
            échanger(tableau[i], tableau[indiceMin])
        FIN SI
    FIN POUR
FIN`,
        
        async sort(array, visualizer) {
            const n = array.length;
            
            for (let i = 0; i < n - 1; i++) {
                visualizer.highlightCode(3); // POUR i
                let minIndex = i;
                
                visualizer.highlightCode(4); // indiceMin ← i
                visualizer.setComparing([i]);
                await visualizer.delay();
                
                // Chercher le minimum dans la partie non-triée
                for (let j = i + 1; j < n; j++) {
                    visualizer.highlightCode(6); // POUR j
                    visualizer.setComparing([minIndex, j]);
                    visualizer.incrementComparisons();
                    await visualizer.delay();
                    
                    visualizer.highlightCode(7); // SI tableau[j] < tableau[indiceMin]
                    if (array[j] < array[minIndex]) {
                        visualizer.highlightCode(8); // indiceMin ← j
                        minIndex = j;
                        await visualizer.delay();
                    }
                }
                
                // Échanger si nécessaire
                visualizer.highlightCode(12); // SI indiceMin ≠ i
                if (minIndex !== i) {
                    visualizer.highlightCode(13); // échanger
                    visualizer.setSwapping([i, minIndex]);
                    await visualizer.delay();
                    
                    [array[i], array[minIndex]] = [array[minIndex], array[i]];
                    visualizer.incrementSwaps();
                }
                
                // Marquer l'élément comme trié
                visualizer.setSorted([i]);
                visualizer.clearHighlights();
                await visualizer.delay();
            }
            
            // Le dernier élément est automatiquement trié
            visualizer.setSorted([n - 1]);
        }
    },

    quick: {
        name: "Tri Rapide (Quick Sort)",
        icon: "⚡",
        description: "Utilise la stratégie 'Diviser pour Régner'. Choisit un pivot, partitionne le tableau, puis trie récursivement les sous-tableaux.",
        complexity: {
            time: "O(n log n) en moyenne, O(n²) dans le pire cas",
            space: "O(log n) pour la récursion",
            stable: "Non - peut changer l'ordre relatif des éléments égaux"
        },
        steps: [
            "Choisir un élément comme pivot",
            "Partitionner : éléments < pivot à gauche, > pivot à droite",
            "Placer le pivot à sa position finale",
            "Appliquer récursivement aux sous-tableaux"
        ],
        pseudocode: `ALGORITHME TriRapide(tableau, début, fin)
DÉBUT
    SI début < fin ALORS
        pivot ← Partitionner(tableau, début, fin)
        TriRapide(tableau, début, pivot - 1)
        TriRapide(tableau, pivot + 1, fin)
    FIN SI
FIN

ALGORITHME Partitionner(tableau, début, fin)
DÉBUT
    pivot ← tableau[fin]
    i ← début - 1
    
    POUR j DE début À fin-1 FAIRE
        SI tableau[j] <= pivot ALORS
            i ← i + 1
            échanger(tableau[i], tableau[j])
        FIN SI
    FIN POUR
    
    échanger(tableau[i + 1], tableau[fin])
    RETOURNER i + 1
FIN`,
        
        async sort(array, visualizer) {
            async function quickSort(start, end) {
                if (start < end) {
                    visualizer.highlightCode(2); // SI début < fin
                    await visualizer.delay();
                    
                    visualizer.highlightCode(3); // pivot ← Partitionner
                    const pivotIndex = await partition(start, end);
                    
                    visualizer.highlightCode(4); // TriRapide gauche
                    await quickSort(start, pivotIndex - 1);
                    
                    visualizer.highlightCode(5); // TriRapide droite
                    await quickSort(pivotIndex + 1, end);
                }
            }
            
            async function partition(start, end) {
                visualizer.highlightCode(10); // pivot ← tableau[fin]
                const pivot = array[end];
                visualizer.setPivot([end]);
                await visualizer.delay();
                
                visualizer.highlightCode(11); // i ← début - 1
                let i = start - 1;
                
                for (let j = start; j < end; j++) {
                    visualizer.highlightCode(13); // POUR j
                    visualizer.setComparing([j, end]);
                    visualizer.incrementComparisons();
                    await visualizer.delay();
                    
                    visualizer.highlightCode(14); // SI tableau[j] <= pivot
                    if (array[j] <= pivot) {
                        i++;
                        visualizer.highlightCode(15); // i ← i + 1
                        visualizer.highlightCode(16); // échanger
                        
                        if (i !== j) {
                            visualizer.setSwapping([i, j]);
                            await visualizer.delay();
                            [array[i], array[j]] = [array[j], array[i]];
                            visualizer.incrementSwaps();
                        }
                    }
                    visualizer.clearHighlights();
                    visualizer.setPivot([end]);
                }
                
                visualizer.highlightCode(20); // échanger pivot
                visualizer.setSwapping([i + 1, end]);
                await visualizer.delay();
                [array[i + 1], array[end]] = [array[end], array[i + 1]];
                visualizer.incrementSwaps();
                
                visualizer.setSorted([i + 1]);
                visualizer.clearHighlights();
                
                return i + 1;
            }
            
            await quickSort(0, array.length - 1);
            
            // Marquer tous les éléments comme triés
            for (let i = 0; i < array.length; i++) {
                visualizer.setSorted([i]);
            }
        }
    },

    merge: {
        name: "Tri Fusion (Merge Sort)",
        icon: "🔀",
        description: "Divise récursivement le tableau en deux moitiés, les trie séparément, puis fusionne les résultats triés.",
        complexity: {
            time: "O(n log n) dans tous les cas",
            space: "O(n) pour les tableaux temporaires",
            stable: "Oui - préserve l'ordre relatif des éléments égaux"
        },
        steps: [
            "Diviser le tableau en deux moitiés",
            "Trier récursivement chaque moitié",
            "Fusionner les deux moitiés triées",
            "Répéter jusqu'à obtenir un seul tableau trié"
        ],
        pseudocode: `ALGORITHME TriFusion(tableau, début, fin)
DÉBUT
    SI début < fin ALORS
        milieu ← (début + fin) / 2
        TriFusion(tableau, début, milieu)
        TriFusion(tableau, milieu + 1, fin)
        Fusionner(tableau, début, milieu, fin)
    FIN SI
FIN

ALGORITHME Fusionner(tableau, début, milieu, fin)
DÉBUT
    // Créer tableaux temporaires
    gauche ← tableau[début...milieu]
    droite ← tableau[milieu+1...fin]
    
    // Fusionner les tableaux
    i ← 0, j ← 0, k ← début
    TANT QUE i < longueur(gauche) ET j < longueur(droite) FAIRE
        SI gauche[i] <= droite[j] ALORS
            tableau[k] ← gauche[i]
            i ← i + 1
        SINON
            tableau[k] ← droite[j]
            j ← j + 1
        FIN SI
        k ← k + 1
    FIN TANT QUE
    
    // Copier les éléments restants
    TANT QUE i < longueur(gauche) FAIRE
        tableau[k] ← gauche[i]
        i ← i + 1
        k ← k + 1
    FIN TANT QUE
    
    TANT QUE j < longueur(droite) FAIRE
        tableau[k] ← droite[j]
        j ← j + 1
        k ← k + 1
    FIN TANT QUE
FIN`,
        
        async sort(array, visualizer) {
            async function mergeSort(start, end) {
                if (start < end) {
                    visualizer.highlightCode(2); // SI début < fin
                    await visualizer.delay();
                    
                    visualizer.highlightCode(3); // milieu ← (début + fin) / 2
                    const mid = Math.floor((start + end) / 2);
                    await visualizer.delay();
                    
                    visualizer.highlightCode(4); // TriFusion gauche
                    await mergeSort(start, mid);
                    
                    visualizer.highlightCode(5); // TriFusion droite
                    await mergeSort(mid + 1, end);
                    
                    visualizer.highlightCode(6); // Fusionner
                    await merge(start, mid, end);
                }
            }
            
            async function merge(start, mid, end) {
                visualizer.highlightCode(11); // Créer tableaux temporaires
                const left = array.slice(start, mid + 1);
                const right = array.slice(mid + 1, end + 1);
                await visualizer.delay();
                
                visualizer.highlightCode(15); // i ← 0, j ← 0, k ← début
                let i = 0, j = 0, k = start;
                
                while (i < left.length && j < right.length) {
                    visualizer.highlightCode(16); // TANT QUE
                    visualizer.setComparing([start + i, mid + 1 + j]);
                    visualizer.incrementComparisons();
                    await visualizer.delay();
                    
                    visualizer.highlightCode(17); // SI gauche[i] <= droite[j]
                    if (left[i] <= right[j]) {
                        visualizer.highlightCode(18); // tableau[k] ← gauche[i]
                        array[k] = left[i];
                        i++;
                    } else {
                        visualizer.highlightCode(20); // tableau[k] ← droite[j]
                        array[k] = right[j];
                        j++;
                    }
                    
                    visualizer.setSorted([k]);
                    k++;
                    await visualizer.delay();
                }
                
                // Copier les éléments restants
                while (i < left.length) {
                    visualizer.highlightCode(26); // TANT QUE i < longueur(gauche)
                    array[k] = left[i];
                    visualizer.setSorted([k]);
                    i++;
                    k++;
                    await visualizer.delay();
                }
                
                while (j < right.length) {
                    visualizer.highlightCode(32); // TANT QUE j < longueur(droite)
                    array[k] = right[j];
                    visualizer.setSorted([k]);
                    j++;
                    k++;
                    await visualizer.delay();
                }
                
                visualizer.clearHighlights();
            }
            
            await mergeSort(0, array.length - 1);
            
            // Marquer tous les éléments comme triés
            for (let i = 0; i < array.length; i++) {
                visualizer.setSorted([i]);
            }
        }
    },

    heap: {
        name: "Tri par Tas (Heap Sort)",
        icon: "🌳",
        description: "Utilise une structure de tas binaire (heap). Construit un max-heap, puis extrait répétitivement le maximum.",
        complexity: {
            time: "O(n log n) dans tous les cas",
            space: "O(1) - tri en place",
            stable: "Non - peut changer l'ordre relatif des éléments égaux"
        },
        steps: [
            "Construire un max-heap à partir du tableau",
            "Échanger la racine (maximum) avec le dernier élément",
            "Réduire la taille du heap et restaurer la propriété",
            "Répéter jusqu'à ce que le heap soit vide"
        ],
        pseudocode: `ALGORITHME TriParTas(tableau)
DÉBUT
    n ← longueur(tableau)
    
    // Construire le max-heap
    POUR i DE n/2 - 1 À 0 FAIRE
        Tamiser(tableau, n, i)
    FIN POUR
    
    // Extraire les éléments un par un
    POUR i DE n-1 À 1 FAIRE
        échanger(tableau[0], tableau[i])
        Tamiser(tableau, i, 0)
    FIN POUR
FIN

ALGORITHME Tamiser(tableau, n, i)
DÉBUT
    max ← i
    gauche ← 2 * i + 1
    droite ← 2 * i + 2
    
    SI gauche < n ET tableau[gauche] > tableau[max] ALORS
        max ← gauche
    FIN SI
    
    SI droite < n ET tableau[droite] > tableau[max] ALORS
        max ← droite
    FIN SI
    
    SI max ≠ i ALORS
        échanger(tableau[i], tableau[max])
        Tamiser(tableau, n, max)
    FIN SI
FIN`,
        
        async sort(array, visualizer) {
            const n = array.length;
            
            // Construire le max-heap
            visualizer.highlightCode(5); // POUR i DE n/2 - 1 À 0
            for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
                await heapify(array, n, i);
            }
            
            // Extraire les éléments un par un
            visualizer.highlightCode(9); // POUR i DE n-1 À 1
            for (let i = n - 1; i > 0; i--) {
                visualizer.highlightCode(10); // échanger(tableau[0], tableau[i])
                visualizer.setSwapping([0, i]);
                await visualizer.delay();
                
                [array[0], array[i]] = [array[i], array[0]];
                visualizer.incrementSwaps();
                visualizer.setSorted([i]);
                
                visualizer.highlightCode(11); // Tamiser(tableau, i, 0)
                await heapify(array, i, 0);
            }
            
            visualizer.setSorted([0]);
            
            async function heapify(arr, n, i) {
                visualizer.highlightCode(16); // max ← i
                let largest = i;
                let left = 2 * i + 1;
                let right = 2 * i + 2;
                
                visualizer.highlightCode(17); // gauche ← 2 * i + 1
                visualizer.highlightCode(18); // droite ← 2 * i + 2
                await visualizer.delay();
                
                // Comparer avec l'enfant gauche
                if (left < n) {
                    visualizer.highlightCode(20); // SI gauche < n ET tableau[gauche] > tableau[max]
                    visualizer.setComparing([largest, left]);
                    visualizer.incrementComparisons();
                    await visualizer.delay();
                    
                    if (arr[left] > arr[largest]) {
                        visualizer.highlightCode(21); // max ← gauche
                        largest = left;
                    }
                }
                
                // Comparer avec l'enfant droit
                if (right < n) {
                    visualizer.highlightCode(24); // SI droite < n ET tableau[droite] > tableau[max]
                    visualizer.setComparing([largest, right]);
                    visualizer.incrementComparisons();
                    await visualizer.delay();
                    
                    if (arr[right] > arr[largest]) {
                        visualizer.highlightCode(25); // max ← droite
                        largest = right;
                    }
                }
                
                // Si le plus grand n'est pas la racine
                if (largest !== i) {
                    visualizer.highlightCode(28); // SI max ≠ i
                    visualizer.highlightCode(29); // échanger
                    visualizer.setSwapping([i, largest]);
                    await visualizer.delay();
                    
                    [arr[i], arr[largest]] = [arr[largest], arr[i]];
                    visualizer.incrementSwaps();
                    
                    visualizer.highlightCode(30); // Tamiser récursif
                    await heapify(arr, n, largest);
                }
                
                visualizer.clearHighlights();
            }
        }
    }
};

// Fonction utilitaire pour créer un tableau aléatoire
function generateRandomArray(size = 15, min = 10, max = 150) {
    const array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return array;
}

// Fonction utilitaire pour créer un tableau presque trié
function generateNearlySortedArray(size = 15, min = 10, max = 150) {
    const array = generateRandomArray(size, min, max);
    array.sort((a, b) => a - b);
    
    // Faire quelques échanges aléatoires pour le rendre "presque" trié
    const swaps = Math.floor(size * 0.1); // 10% d'échanges
    for (let i = 0; i < swaps; i++) {
        const idx1 = Math.floor(Math.random() * size);
        const idx2 = Math.floor(Math.random() * size);
        [array[idx1], array[idx2]] = [array[idx2], array[idx1]];
    }
    
    return array;
}

// Fonction utilitaire pour créer un tableau inversé
function generateReversedArray(size = 15, min = 10, max = 150) {
    const array = generateRandomArray(size, min, max);
    return array.sort((a, b) => b - a); // Tri décroissant
}
