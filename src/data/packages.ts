export interface Package {
  name: string;
  description: string;
  language: string;
  githubUrl: string;
  docsUrl: string;
  category: string;
}

export const packages: Package[] = [
  {
    name: "DiagHamInterface.jl",
    description: "A universal interface to the DiagHam binaries. This package provides a convenient Julia interface for working with DiagHam, a powerful software package for exact diagonalization of quantum many-body systems, particularly in the context of fractional quantum Hall effect and other strongly correlated systems.",
    language: "Julia",
    githubUrl: "https://github.com/ManyBodyLab/DiagHamInterface.jl",
    docsUrl: "https://manybodylab.github.io/DiagHamInterface.jl",
    category: "Exact Diagonalization"
  },
  {
    name: "PeriodicArrays.jl",
    description: "A Julia package for working with periodic arrays and lattices. This package provides efficient tools for handling arrays with periodic boundary conditions, which are essential for simulating quantum systems on finite lattices with translational symmetry.",
    language: "Julia",
    githubUrl: "https://github.com/ManyBodyLab/PeriodicArrays.jl",
    docsUrl: "https://manybodylab.github.io/PeriodicArrays.jl",
    category: "Utility Libraries"
  },
  {
    name: "TensorKitAdapters.jl",
    description: "Adapter utilities for TensorKit.jl integration. This package provides convenient adapters and interfaces for working with TensorKit.jl, enabling seamless integration with other tensor network libraries and facilitating advanced tensor manipulations in quantum many-body simulations.",
    language: "Julia",
    githubUrl: "https://github.com/ManyBodyLab/TensorKitAdapters.jl",
    docsUrl: "https://manybodylab.github.io/TensorKitAdapters.jl",
    category: "Tensor Networks"
  },
  {
    name: "MPSKitAdapters.jl",
    description: "Adapter utilities for MPSKit.jl integration. This package provides convenient adapters and interfaces for working with MPSKit.jl, facilitating matrix product state (MPS) calculations and tensor network algorithms for one-dimensional quantum many-body systems.",
    language: "Julia",
    githubUrl: "https://github.com/ManyBodyLab/MPSKitAdapters.jl",
    docsUrl: "https://manybodylab.github.io/MPSKitAdapters.jl",
    category: "Tensor Networks"
  },
  {
    name: "MPSKitParallel.jl",
    description: "A Julia package dedicated to offering multi-processing in MPSKit.jl. This package enables parallel computations for matrix product state algorithms, allowing researchers to leverage multiple processors for efficient simulations of one-dimensional quantum many-body systems.",
    language: "Julia",
    githubUrl: "https://github.com/ManyBodyLab/MPSKitParallel.jl",
    docsUrl: "https://manybodylab.github.io/MPSKitParallel.jl",
    category: "Tensor Networks"
  }
];

export interface Category {
  name: string;
  description: string;
  icon: string;
}

export const categories: Category[] = [
  {
    name: "Exact Diagonalization",
    description: "Precise numerical solutions for finite quantum systems. Exact diagonalization methods provide the most accurate results for small to medium-sized quantum systems by directly computing eigenvalues and eigenvectors of the Hamiltonian matrix.",
    icon: "⚛️"
  },
  {
    name: "Tensor Networks",
    description: "Efficient representations of quantum states. Tensor network methods enable the study of large quantum systems by exploiting their entanglement structure, making them essential for modern quantum many-body simulations.",
    icon: "🕸️"
  },
  {
    name: "Utility Libraries",
    description: "General-purpose Julia utilities and tools. These packages provide fundamental building blocks and utilities that can be used across different computational physics applications.",
    icon: "🔧"
  }
];

export function getPackagesByCategory(categoryName: string): Package[] {
  return packages.filter(pkg => pkg.category === categoryName);
}
