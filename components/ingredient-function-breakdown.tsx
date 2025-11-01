import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Droplets, Shield, Sparkles, Waves } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Ingredient {
  name: string
  functions: {
    humectant?: number
    moisturizer?: number
    emollient?: number
    occlusive?: number
  }
  description: string
}

interface IngredientFunctionBreakdownProps {
  ingredients: Ingredient[]
}

export function IngredientFunctionBreakdown({ ingredients }: IngredientFunctionBreakdownProps) {
  // Calculate total percentages for each function
  const totals = {
    humectant: 0,
    moisturizer: 0,
    emollient: 0,
    occlusive: 0,
  }

  ingredients.forEach((ingredient) => {
    if (ingredient.functions.humectant) totals.humectant += ingredient.functions.humectant
    if (ingredient.functions.moisturizer) totals.moisturizer += ingredient.functions.moisturizer
    if (ingredient.functions.emollient) totals.emollient += ingredient.functions.emollient
    if (ingredient.functions.occlusive) totals.occlusive += ingredient.functions.occlusive
  })

  const getFunctionIcon = (functionName: string) => {
    switch (functionName) {
      case "humectant":
        return <Droplets className="h-4 w-4 text-sky-600" />
      case "moisturizer":
        return <Waves className="h-4 w-4 text-emerald-600" />
      case "emollient":
        return <Sparkles className="h-4 w-4 text-amber-600" />
      case "occlusive":
        return <Shield className="h-4 w-4 text-purple-600" />
      default:
        return null
    }
  }

  const getFunctionColor = (functionName: string) => {
    switch (functionName) {
      case "humectant":
        return "bg-sky-100 text-sky-800"
      case "moisturizer":
        return "bg-emerald-100 text-emerald-800"
      case "emollient":
        return "bg-amber-100 text-amber-800"
      case "occlusive":
        return "bg-purple-100 text-purple-800"
      default:
        return ""
    }
  }

  const getFunctionLabel = (functionName: string) => {
    return functionName.charAt(0).toUpperCase() + functionName.slice(1)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ingredient Function Analysis</CardTitle>
        <CardDescription>How each ingredient contributes to the product's properties</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Function breakdown */}
        <div className="space-y-4">
          {Object.entries(totals).map(
            ([functionName, total]) =>
              total > 0 && (
                <div key={functionName} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      {getFunctionIcon(functionName)}
                      <span className="font-medium">{getFunctionLabel(functionName)}</span>
                      <span className="text-sm text-muted-foreground">({total}%)</span>
                    </div>
                  </div>
                  <Progress value={total} className="h-2" />
                  <div className="flex flex-wrap gap-1 mt-1">
                    {ingredients
                      .filter((ingredient) => ingredient.functions[functionName as keyof typeof ingredient.functions])
                      .map((ingredient) => (
                        <TooltipProvider key={`${ingredient.name}-${functionName}`}>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Badge variant="outline" className={`${getFunctionColor(functionName)} text-xs`}>
                                {ingredient.name}{" "}
                                {ingredient.functions[functionName as keyof typeof ingredient.functions] &&
                                  `(${ingredient.functions[functionName as keyof typeof ingredient.functions]}%)`}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="max-w-xs">{ingredient.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      ))}
                  </div>
                </div>
              ),
          )}
        </div>

        {/* Ingredient breakdown */}
        <div className="space-y-4">
          <h3 className="font-medium">Key Ingredients</h3>
          <div className="grid gap-3">
            {ingredients.map((ingredient) => (
              <div key={ingredient.name} className="border rounded-md p-3">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{ingredient.name}</h4>
                  <div className="flex gap-1">
                    {Object.entries(ingredient.functions).map(
                      ([functionName, value]) =>
                        value && (
                          <Badge
                            key={`${ingredient.name}-${functionName}`}
                            variant="outline"
                            className={`${getFunctionColor(functionName)} text-xs`}
                          >
                            {getFunctionLabel(functionName)}
                          </Badge>
                        ),
                    )}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{ingredient.description}</p>
                <div className="mt-2 flex h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  {ingredient.functions.humectant && (
                    <div className="bg-sky-400" style={{ width: `${ingredient.functions.humectant}%` }}></div>
                  )}
                  {ingredient.functions.moisturizer && (
                    <div className="bg-emerald-400" style={{ width: `${ingredient.functions.moisturizer}%` }}></div>
                  )}
                  {ingredient.functions.emollient && (
                    <div className="bg-amber-400" style={{ width: `${ingredient.functions.emollient}%` }}></div>
                  )}
                  {ingredient.functions.occlusive && (
                    <div className="bg-purple-400" style={{ width: `${ingredient.functions.occlusive}%` }}></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
