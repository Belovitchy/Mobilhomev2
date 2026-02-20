export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center min-h-50 w-full gap-4">
      {/* Le rond qui tourne */}
      <div className="relative w-12 h-12">
        <div className="w-12 h-12 border-4 border-(--color-primary) border-t-transparent rounded-full animate-spin"></div>
        {/* Petit point décoratif optionnel au centre */}
        <div className="absolute inset-0 m-auto w-2 h-2 bg-(--color-primary) rounded-full opacity-50"></div>
      </div>

      {/* Texte d'accompagnement */}
      <p className="text-(--color-primary) text-sm font-medium animate-pulse tracking-widest">
        CHARGEMENT...
      </p>
    </div>
  );
}
